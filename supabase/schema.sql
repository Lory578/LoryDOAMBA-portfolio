create extension if not exists "pgcrypto";

create type public.post_status as enum ('draft', 'published');

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status public.post_status not null default 'draft',
  title_fr text not null,
  title_en text,
  excerpt_fr text not null default '',
  excerpt_en text,
  content_fr text not null default '',
  content_en text,
  cover_image_url text,
  tags text[] not null default '{}',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint published_posts_have_date check (status = 'draft' or published_at is not null)
);

create table if not exists public.site_settings (
  id boolean primary key default true check (id),
  cv_url text,
  cv_updated_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  position integer not null default 0,
  group_name text not null default 'product',
  title_fr text not null,
  title_en text,
  description_fr text not null default '',
  description_en text,
  tags text[] not null default '{}',
  demo_url text,
  github_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  position integer not null default 0,
  title_fr text not null,
  title_en text,
  description_fr text not null default '',
  description_en text,
  publication_name text not null,
  published_at date,
  url text,
  image_url text,
  kind text not null default 'about',
  visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (true)
on conflict (id) do nothing;

create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_published_at_idx on public.posts (published_at desc)
where status = 'published';
create index if not exists projects_position_idx on public.projects (position);
create index if not exists publications_position_idx on public.publications (position);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at before update on public.posts
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at before update on public.site_settings
for each row execute function public.set_updated_at();

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists publications_set_updated_at on public.publications;
create trigger publications_set_updated_at before update on public.publications
for each row execute function public.set_updated_at();

alter table public.posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.projects enable row level security;
alter table public.publications enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select auth.role() = 'authenticated'
    and lower(coalesce(auth.jwt() ->> 'email', '')) = lower('ADMIN_EMAIL_PLACEHOLDER');
$$;

drop policy if exists "published posts are public" on public.posts;
create policy "published posts are public" on public.posts
for select using (status = 'published' or public.is_admin());

drop policy if exists "admins manage posts" on public.posts;
create policy "admins manage posts" on public.posts
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins read settings" on public.site_settings;
create policy "admins read settings" on public.site_settings
for select using (public.is_admin());

drop policy if exists "admins manage settings" on public.site_settings;
create policy "admins manage settings" on public.site_settings
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public reads visible projects" on public.projects;
create policy "public reads visible projects" on public.projects
for select using (published = true or public.is_admin());

drop policy if exists "admins manage projects" on public.projects;
create policy "admins manage projects" on public.projects
for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public reads visible publications" on public.publications;
create policy "public reads visible publications" on public.publications
for select using (visible = true or public.is_admin());

drop policy if exists "admins manage publications" on public.publications;
create policy "admins manage publications" on public.publications
for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true), ('documents', 'documents', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "public reads blog assets" on storage.objects;
create policy "public reads blog assets" on storage.objects
for select using (bucket_id in ('blog-images', 'documents'));

drop policy if exists "admins manage blog assets" on storage.objects;
create policy "admins manage blog assets" on storage.objects
for all using (bucket_id in ('blog-images', 'documents') and public.is_admin())
with check (bucket_id in ('blog-images', 'documents') and public.is_admin());
