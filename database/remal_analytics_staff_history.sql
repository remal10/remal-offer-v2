
create schema if not exists remal_private;
revoke all on schema remal_private from public;
grant usage on schema remal_private to anon,authenticated;
alter table public.staff_emails add column app_role text not null default 'admin' check(app_role in ('admin','section'));
alter table public.staff_emails add column section text check(section in ('restaurant','bar','pool','spa','services'));
alter table public.staff_emails alter column app_role set default 'section';
alter table public.staff_emails add constraint staff_section_required check(app_role='admin' or section is not null);
create function public.remal_admin() returns boolean language sql stable security invoker set search_path='' as $$
select auth.uid() is not null and exists(select 1 from public.staff_emails where email=lower(auth.jwt()->>'email') and app_role='admin') $$;
create function public.remal_manage(c text) returns boolean language sql stable security invoker set search_path='' as $$
select auth.uid() is not null and exists(select 1 from public.staff_emails where email=lower(auth.jwt()->>'email') and (app_role='admin' or section=c)) $$;
revoke all on function public.remal_admin(),public.remal_manage(text) from public;
grant execute on function public.remal_admin(),public.remal_manage(text) to anon,authenticated;

alter policy "staff read all" on public.offers using(public.remal_manage(category));
alter policy "staff insert" on public.offers with check(public.remal_manage(category));
alter policy "staff update" on public.offers using(public.remal_manage(category)) with check(public.remal_manage(category));
alter policy "staff delete" on public.offers using(public.remal_manage(category));
alter policy "staff insert sections" on public.sections with check(public.remal_manage(category));
alter policy "staff update sections" on public.sections using(public.remal_manage(category)) with check(public.remal_manage(category));
alter policy "staff delete sections" on public.sections using(public.remal_manage(category));
alter policy "staff insert hero" on public.hero_images with check((select public.remal_admin()));
alter policy "staff update hero" on public.hero_images using((select public.remal_admin())) with check((select public.remal_admin()));
alter policy "staff delete hero" on public.hero_images using((select public.remal_admin()));
alter policy "staff insert settings" on public.site_settings with check((select public.remal_admin()));
alter policy "staff update settings" on public.site_settings using((select public.remal_admin())) with check((select public.remal_admin()));
alter policy "staff delete settings" on public.site_settings using((select public.remal_admin()));
-- Only published announcements are public; drafts remain available to administrators.
create function public.remal_visible_setting(k text,v text) returns boolean language plpgsql immutable security invoker set search_path='' as $$
begin
 if k not like 'announcement_%' then return true; end if;
 return coalesce((v::jsonb->>'published')::boolean,false);
exception when others then return false;
end $$;
revoke all on function public.remal_visible_setting(text,text) from public;
grant execute on function public.remal_visible_setting(text,text) to anon,authenticated;
alter policy "public read settings" on public.site_settings using(public.remal_visible_setting(key,value));
create policy "admin read settings" on public.site_settings for select to authenticated using((select public.remal_admin()));

create function public.remal_media(p text) returns boolean language sql stable security invoker set search_path='' as $$
select public.remal_admin() or exists(select 1 from public.staff_emails s where s.email=lower(auth.jwt()->>'email') and s.app_role='section' and
 (p like s.section||'/%' or p like 'sections/'||s.section||'-%' or exists(select 1 from public.offers o where o.media_path=p and o.category=s.section))) $$;
revoke all on function public.remal_media(text) from public;
grant execute on function public.remal_media(text) to authenticated;
alter policy "staff insert media" on storage.objects with check(bucket_id='offers' and public.remal_media(name));
alter policy "staff update media" on storage.objects using(bucket_id='offers' and public.remal_media(name)) with check(bucket_id='offers' and public.remal_media(name));
-- Historical media must remain available to restore earlier versions.
drop policy "staff delete media" on storage.objects;

create table remal_private.events(
 id bigint generated always as identity primary key,
 at timestamptz not null default now(),visitor uuid not null,session_id uuid not null,
 kind text not null check(kind in ('visit','qr_open','impression','offer_view','whatsapp','call')),
 offer_id uuid,category text,source text not null default 'direct',language text,
 unique(session_id,kind,offer_id)
);
create unique index events_page_dedupe on remal_private.events(session_id,kind) where offer_id is null;
create index events_at on remal_private.events(at);
create index events_visitor_at on remal_private.events(visitor,at);
alter table remal_private.events enable row level security;
create function remal_private.capture(p_visitor uuid,p_session uuid,p_kind text,p_offer uuid,p_source text,p_language text) returns boolean
language plpgsql security definer set search_path='' as $$
declare c text;
begin
 if p_visitor is null or p_session is null or p_kind not in ('visit','qr_open','impression','offer_view','whatsapp','call') then return false; end if;
 if public.is_staff() then return false; end if;
 if p_kind in ('visit','qr_open') and p_offer is not null then return false; end if;
 if p_kind not in ('visit','qr_open') and p_offer is null then return false; end if;
 if p_kind='qr_open' and p_source<>'qr' then return false; end if;
 if p_offer is not null then
   select category into c from public.offers where id=p_offer and published and (valid_until is null or valid_until>=(now() at time zone 'Asia/Dubai')::date);
   if c is null then return false; end if;
 end if;
 perform pg_advisory_xact_lock(hashtextextended(p_visitor::text,0));
 if (select count(*) from remal_private.events where visitor=p_visitor and at>now()-interval '1 day')>=200 then return false; end if;
 insert into remal_private.events(visitor,session_id,kind,offer_id,category,source,language)
 values(p_visitor,p_session,p_kind,p_offer,c,case when p_source='qr' then 'qr' else 'direct' end,case when p_language in ('en','fr','ar','hi','zh') then p_language else 'en' end)
 on conflict do nothing;
 return true;
end $$;
create function public.remal_track(p_visitor uuid,p_session uuid,p_kind text,p_offer uuid default null,p_source text default 'direct',p_language text default 'en') returns boolean language sql security invoker set search_path='' as $$
select remal_private.capture(p_visitor,p_session,p_kind,p_offer,p_source,p_language) $$;
create function remal_private.stats(p_days integer) returns jsonb language plpgsql security definer set search_path='' as $$
declare since_date timestamptz;result jsonb;admin boolean;
begin
 if auth.uid() is null or not public.is_staff() then raise exception 'Staff access required' using errcode='42501'; end if;
 admin:=public.remal_admin();since_date:=now()-make_interval(days=>greatest(1,least(coalesce(p_days,30),90)));
 select jsonb_build_object(
 'days',greatest(1,least(coalesce(p_days,30),90)),
 'scope',case when admin then 'hotel' else 'section' end,
 'totals',(select jsonb_build_object('visits',count(*) filter(where kind='visit'),'qr_opens',count(*) filter(where kind='qr_open'),'visitors',count(distinct visitor),'impressions',count(*) filter(where kind='impression'),'offer_views',count(*) filter(where kind='offer_view'),'whatsapp',count(*) filter(where kind='whatsapp'),'calls',count(*) filter(where kind='call')) from remal_private.events e where at>=since_date and (admin or public.remal_manage(e.category))),
 'offers',coalesce((select jsonb_agg(x) from (select e.offer_id,o.translations->'en'->>'title' title,e.category,count(*) filter(where kind='impression') impressions,count(*) filter(where kind='offer_view') views,count(*) filter(where kind='whatsapp') whatsapp,count(*) filter(where kind='call') calls from remal_private.events e left join public.offers o on o.id=e.offer_id where e.at>=since_date and e.offer_id is not null and (admin or public.remal_manage(e.category)) group by e.offer_id,o.translations,e.category order by count(*) filter(where kind='offer_view') desc limit 100)x),'[]'::jsonb),
 'daily',coalesce((select jsonb_agg(x) from (select (at at time zone 'Asia/Dubai')::date as "day",count(*) filter(where kind='qr_open') qr_opens,count(*) filter(where kind='offer_view') offer_views,count(distinct visitor) visitors from remal_private.events e where at>=since_date and (admin or public.remal_manage(e.category)) group by 1 order by 1)x),'[]'::jsonb)
 ) into result;return result;
end $$;
create function public.remal_stats(p_days integer default 30) returns jsonb language sql security invoker set search_path='' as $$select remal_private.stats(p_days)$$;

create table remal_private.history(
 id bigint generated always as identity primary key,at timestamptz not null default now(),
 actor text,entity text not null,operation text not null,before_data jsonb,after_data jsonb,category text
);
alter table remal_private.history enable row level security;
create index history_at on remal_private.history(at desc);
create function remal_private.audit() returns trigger language plpgsql security definer set search_path='' as $$
declare b jsonb;a jsonb;c text;
begin
 if tg_op<>'INSERT' then b:=to_jsonb(old);end if;
 if tg_op<>'DELETE' then a:=to_jsonb(new);end if;
 c:=coalesce(a->>'category',b->>'category');
 insert into remal_private.history(actor,entity,operation,before_data,after_data,category)
 values(coalesce(auth.jwt()->>'email','system'),tg_table_name,tg_op,b,a,c);
 if tg_op='DELETE' then return old;end if;return new;
end $$;
create trigger remal_audit_offers after insert or update or delete on public.offers for each row execute function remal_private.audit();
create trigger remal_audit_sections after insert or update or delete on public.sections for each row execute function remal_private.audit();
create trigger remal_audit_hero after insert or update or delete on public.hero_images for each row execute function remal_private.audit();
create trigger remal_audit_settings after insert or update or delete on public.site_settings for each row execute function remal_private.audit();
create trigger remal_audit_staff after insert or update or delete on public.staff_emails for each row execute function remal_private.audit();
create function remal_private.history_list() returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not public.is_staff() then raise exception 'Staff access required' using errcode='42501';end if;
 return coalesce((select jsonb_agg(x) from (select id,at,actor,entity,operation,category,coalesce(after_data->'translations'->'en'->>'title',before_data->'translations'->'en'->>'title',after_data->>'key',before_data->>'key',after_data->>'id',before_data->>'id',entity) title,before_data is not null and entity<>'staff_emails' restorable from remal_private.history where public.remal_admin() or (entity in ('offers','sections') and public.remal_manage(category)) order by id desc limit 150)x),'[]'::jsonb);
end $$;
create function public.remal_history() returns jsonb language sql security invoker set search_path='' as $$select remal_private.history_list()$$;
create function remal_private.restore(p_id bigint) returns boolean language plpgsql security definer set search_path='' as $$
declare h remal_private.history%rowtype;v jsonb;pk text;columns_list text;assignments text;current_cat text;
begin
 if auth.uid() is null or not public.is_staff() then raise exception 'Staff access required' using errcode='42501';end if;
 select * into h from remal_private.history where id=p_id;
 if h.id is null or h.before_data is null or h.entity not in ('offers','sections','hero_images','site_settings') then raise exception 'Version cannot be restored';end if;
 if not public.remal_admin() and (h.entity not in ('offers','sections') or not public.remal_manage(h.category)) then raise exception 'Access denied' using errcode='42501';end if;
 v:=h.before_data;
 if h.entity='offers' then
   select category into current_cat from public.offers where id=(v->>'id')::uuid;
   if current_cat is not null and not public.remal_manage(current_cat) then raise exception 'Access denied' using errcode='42501';end if;
   v:=v||jsonb_build_object('published',false,'updated_at',now());
 elsif h.entity='site_settings' and v->>'key' like 'announcement_%' then
   v:=jsonb_set(v,'{value}',to_jsonb(((v->>'value')::jsonb||'{"published":false}'::jsonb)::text));
 end if;
 pk:=case h.entity when 'sections' then 'category' when 'site_settings' then 'key' else 'id' end;
 select string_agg(format('%I',key),','),string_agg(format('%I=excluded.%I',key,key),',') filter(where key<>pk)
 into columns_list,assignments from jsonb_object_keys(v) key;
 execute format('insert into public.%I (%s) select %s from jsonb_populate_record(null::public.%I,$1) on conflict (%I) do update set %s',h.entity,columns_list,columns_list,h.entity,pk,assignments) using v;
 return true;
end $$;
create function public.remal_restore(p_id bigint) returns boolean language sql security invoker set search_path='' as $$select remal_private.restore(p_id)$$;

create function remal_private.staff_list() returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not public.remal_admin() then raise exception 'Admin access required' using errcode='42501';end if;
 return coalesce((select jsonb_agg(jsonb_build_object('email',email,'app_role',app_role,'section',section)) from public.staff_emails),'[]'::jsonb);
end $$;
create function public.remal_staff_list() returns jsonb language sql security invoker set search_path='' as $$select remal_private.staff_list()$$;
create function remal_private.staff_set(p_email text,p_role text,p_section text,p_remove boolean) returns boolean language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not public.remal_admin() then raise exception 'Admin access required' using errcode='42501';end if;
 if lower(trim(p_email))=lower(auth.jwt()->>'email') then raise exception 'You cannot change your own access';end if;
 if p_email is null or length(p_email)>254 or position('@' in p_email)<2 then raise exception 'Invalid email';end if;
 if p_remove then delete from public.staff_emails where email=lower(trim(p_email));return true;end if;
 if p_role not in ('admin','section') or (p_role='section' and (p_section is null or p_section not in ('restaurant','bar','pool','spa','services'))) then raise exception 'Invalid role or section';end if;
 insert into public.staff_emails(email,app_role,section) values(lower(trim(p_email)),p_role,case when p_role='section' then p_section end)
 on conflict(email) do update set app_role=excluded.app_role,section=excluded.section;
 return true;
end $$;
create function public.remal_staff_set(p_email text,p_role text default 'section',p_section text default null,p_remove boolean default false) returns boolean language sql security invoker set search_path='' as $$select remal_private.staff_set(p_email,p_role,p_section,p_remove)$$;
revoke all on all tables in schema remal_private from public,anon,authenticated;
revoke all on all sequences in schema remal_private from public,anon,authenticated;
revoke all on all functions in schema remal_private from public,anon,authenticated;
grant execute on function remal_private.capture(uuid,uuid,text,uuid,text,text) to anon,authenticated;
grant execute on function remal_private.stats(integer),remal_private.history_list(),remal_private.restore(bigint),remal_private.staff_list(),remal_private.staff_set(text,text,text,boolean) to authenticated;
revoke all on function public.remal_track(uuid,uuid,text,uuid,text,text),public.remal_stats(integer),public.remal_history(),public.remal_restore(bigint),public.remal_staff_list(),public.remal_staff_set(text,text,text,boolean) from public;
grant execute on function public.remal_track(uuid,uuid,text,uuid,text,text) to anon,authenticated;
grant execute on function public.remal_stats(integer),public.remal_history(),public.remal_restore(bigint),public.remal_staff_list(),public.remal_staff_set(text,text,text,boolean) to authenticated;
notify pgrst,'reload schema';


create or replace function public.hero_limit() returns trigger language plpgsql set search_path='' as $$
begin
 perform pg_advisory_xact_lock(71209483);
 if exists(select 1 from public.hero_images where id=new.id) then return new;end if;
 if (select count(*) from public.hero_images)>=10 then raise exception 'Maximum 10 hero images';end if;
 return new;
end $$;

create policy "no direct browser access" on remal_private.events for all to anon,authenticated using(false) with check(false);
create policy "no direct browser access" on remal_private.history for all to anon,authenticated using(false) with check(false);
