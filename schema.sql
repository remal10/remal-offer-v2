-- Remal Hotel & Villas — Supabase schema (Postgres)
-- Run this in the Supabase SQL editor to recreate the backend.

-- Staff allow-list: only these emails can open the dashboard.
create table public.staff_emails (
  email text primary key,
  created_at timestamptz not null default now()
);
alter table public.staff_emails enable row level security;

create function public.is_staff() returns boolean
language sql stable set search_path = ''
as $$ select exists (select 1 from public.staff_emails s where s.email = lower(coalesce((select auth.jwt() ->> 'email'), ''))) $$;

create policy "staff read own row" on public.staff_emails for select to authenticated
  using (email = lower(coalesce((select auth.jwt() ->> 'email'), '')));

-- Offers (translations hold title / tagline / description per language)
create table public.offers (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  price text,
  old_price text,
  badge text check (badge in ('new','signature','popular','limited','exclusive')),
  valid_until date,
  featured boolean not null default false,
  media_path text,
  media_type text,
  translations jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.offers enable row level security;
create policy "public read published" on public.offers for select to anon, authenticated using (published);
create policy "staff read all" on public.offers for select to authenticated using ((select is_staff()));
create policy "staff insert" on public.offers for insert to authenticated with check ((select is_staff()));
create policy "staff update" on public.offers for update to authenticated using ((select is_staff())) with check ((select is_staff()));
create policy "staff delete" on public.offers for delete to authenticated using ((select is_staff()));

-- One cover image or video per section
create table public.sections (
  category text primary key check (category in ('restaurant','bar','pool','spa','services')),
  media_path text,
  media_type text check (media_type in ('image','video')),
  updated_at timestamptz not null default now()
);
alter table public.sections enable row level security;
create policy "public read sections" on public.sections for select to anon, authenticated using (true);
create policy "staff insert sections" on public.sections for insert to authenticated with check ((select is_staff()));
create policy "staff update sections" on public.sections for update to authenticated using ((select is_staff())) with check ((select is_staff()));
create policy "staff delete sections" on public.sections for delete to authenticated using ((select is_staff()));
insert into public.sections (category) values ('restaurant'),('bar'),('pool'),('spa'),('services');

-- Home page images (maximum 10)
create table public.hero_images (
  id uuid primary key default gen_random_uuid(),
  media_path text not null,
  active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
alter table public.hero_images enable row level security;
create policy "public read hero" on public.hero_images for select to anon, authenticated using (true);
create policy "staff insert hero" on public.hero_images for insert to authenticated with check ((select is_staff()));
create policy "staff update hero" on public.hero_images for update to authenticated using ((select is_staff())) with check ((select is_staff()));
create policy "staff delete hero" on public.hero_images for delete to authenticated using ((select is_staff()));
create function public.hero_limit() returns trigger language plpgsql set search_path = public as $$
begin
  if (select count(*) from public.hero_images) >= 10 then raise exception 'Maximum 10 hero images'; end if;
  return new;
end $$;
create trigger hero_limit_trg before insert on public.hero_images for each row execute function public.hero_limit();

-- Reservation contacts shown on every offer (keys: whatsapp, phone)
create table public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_settings enable row level security;
create policy "public read settings" on public.site_settings for select to anon, authenticated using (true);
create policy "staff insert settings" on public.site_settings for insert to authenticated with check ((select is_staff()));
create policy "staff update settings" on public.site_settings for update to authenticated using ((select is_staff())) with check ((select is_staff()));
create policy "staff delete settings" on public.site_settings for delete to authenticated using ((select is_staff()));
insert into public.site_settings (key, value) values ('whatsapp',''),('phone','');

-- Storage: a public bucket named "offers" for all photos and videos.
-- Create it in Storage > New bucket (tick "Public bucket"), then:
create policy "staff select media" on storage.objects for select to authenticated using (bucket_id = 'offers' and (select is_staff()));
create policy "staff insert media" on storage.objects for insert to authenticated with check (bucket_id = 'offers' and (select is_staff()));
create policy "staff update media" on storage.objects for update to authenticated using (bucket_id = 'offers' and (select is_staff())) with check (bucket_id = 'offers' and (select is_staff()));
create policy "staff delete media" on storage.objects for delete to authenticated using (bucket_id = 'offers' and (select is_staff()));

-- Authorise the first staff member (lowercase email):
-- insert into public.staff_emails (email) values ('you@example.com');
