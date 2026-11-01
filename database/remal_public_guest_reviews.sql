
create table remal_private.reviews(
 id uuid primary key default gen_random_uuid(),created_at timestamptz not null default now(),
 visitor uuid not null,category text not null check(category in ('restaurant','bar','pool','spa','services')),
 rating smallint not null check(rating between 1 and 5),body text not null check(length(body)<=1000),
 display_name text not null default '' check(length(display_name)<=60),language text not null check(language in ('en','fr','ar','hi','zh')),
 status text not null default 'pending' check(status in ('pending','published','rejected')),
 moderated_at timestamptz,moderated_by text
);
alter table remal_private.reviews enable row level security;
create policy "no direct browser access" on remal_private.reviews for all to anon,authenticated using(false) with check(false);
create index reviews_public on remal_private.reviews(category,status,created_at desc);
create index reviews_rate on remal_private.reviews(visitor,created_at desc);
create function remal_private.review_submit(p_visitor uuid,p_category text,p_rating integer,p_body text,p_name text,p_language text) returns boolean language plpgsql security definer set search_path='' as $$
begin
 if p_visitor is null or p_category is null or p_category not in ('restaurant','bar','pool','spa','services') or p_rating is null or p_rating not between 1 and 5 then raise exception 'Invalid review';end if;
 if coalesce(length(p_body),0)>1000 or coalesce(length(p_name),0)>60 or p_language is null or p_language not in ('en','fr','ar','hi','zh') then raise exception 'Invalid review text';end if;
 perform pg_advisory_xact_lock(hashtextextended(p_visitor::text,1));
 if (select count(*) from remal_private.reviews where visitor=p_visitor and created_at>now()-interval '1 day')>=3 then raise exception 'Daily review limit reached. Please try tomorrow.';end if;
 if exists(select 1 from remal_private.reviews where visitor=p_visitor and category=p_category and created_at>now()-interval '1 day') then raise exception 'A review for this section was already submitted today.';end if;
 insert into remal_private.reviews(visitor,category,rating,body,display_name,language)
 values(p_visitor,p_category,p_rating,trim(coalesce(p_body,'')),trim(coalesce(p_name,'')),p_language);
 return true;
end $$;
create function public.remal_review_submit(p_visitor uuid,p_category text,p_rating integer,p_body text default '',p_name text default '',p_language text default 'en') returns boolean language sql security invoker set search_path='' as $$select remal_private.review_submit(p_visitor,p_category,p_rating,p_body,p_name,p_language)$$;
create function remal_private.reviews_public(p_category text,p_offset integer) returns jsonb language plpgsql stable security definer set search_path='' as $$
begin
 return jsonb_build_object(
 'count',(select count(*) from remal_private.reviews where status='published' and (p_category is null or category=p_category)),
 'average',(select round(avg(rating),1) from remal_private.reviews where status='published' and (p_category is null or category=p_category)),
 'items',coalesce((select jsonb_agg(x) from (select id,created_at,category,rating,body,display_name,language from remal_private.reviews where status='published' and (p_category is null or category=p_category) order by created_at desc,id limit 12 offset greatest(0,least(coalesce(p_offset,0),10000)))x),'[]'::jsonb));
end $$;
create function public.remal_reviews(p_category text default null,p_offset integer default 0) returns jsonb language sql security invoker set search_path='' as $$select remal_private.reviews_public(p_category,p_offset)$$;
create function remal_private.review_queue(p_status text) returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not public.is_staff() then raise exception 'Staff access required' using errcode='42501';end if;
 return coalesce((select jsonb_agg(x) from (select id,created_at,category,rating,body,display_name,language,status from remal_private.reviews where status=p_status and public.remal_manage(category) order by created_at desc limit 100)x),'[]'::jsonb);
end $$;
create function public.remal_review_queue(p_status text default 'pending') returns jsonb language sql security invoker set search_path='' as $$select remal_private.review_queue(p_status)$$;
create function remal_private.review_moderate(p_id uuid,p_status text) returns boolean language plpgsql security definer set search_path='' as $$
declare c text;
begin
 if auth.uid() is null or not public.is_staff() then raise exception 'Staff access required' using errcode='42501';end if;
 if p_status is null or p_status not in ('published','rejected','pending') then raise exception 'Invalid status';end if;
 select category into c from remal_private.reviews where id=p_id for update;
 if c is null or not public.remal_manage(c) then raise exception 'Access denied' using errcode='42501';end if;
 update remal_private.reviews set status=p_status,moderated_at=now(),moderated_by=lower(auth.jwt()->>'email') where id=p_id;
 return true;
end $$;
create function public.remal_review_moderate(p_id uuid,p_status text) returns boolean language sql security invoker set search_path='' as $$select remal_private.review_moderate(p_id,p_status)$$;
revoke all on remal_private.reviews from public,anon,authenticated;
revoke all on function remal_private.review_submit(uuid,text,integer,text,text,text),remal_private.reviews_public(text,integer),remal_private.review_queue(text),remal_private.review_moderate(uuid,text) from public,anon,authenticated;
revoke all on function public.remal_review_submit(uuid,text,integer,text,text,text),public.remal_reviews(text,integer),public.remal_review_queue(text),public.remal_review_moderate(uuid,text) from public,anon,authenticated;
grant execute on function remal_private.review_submit(uuid,text,integer,text,text,text),remal_private.reviews_public(text,integer),public.remal_review_submit(uuid,text,integer,text,text,text),public.remal_reviews(text,integer) to anon,authenticated;
grant execute on function remal_private.review_queue(text),remal_private.review_moderate(uuid,text),public.remal_review_queue(text),public.remal_review_moderate(uuid,text) to authenticated;
notify pgrst,'reload schema';
