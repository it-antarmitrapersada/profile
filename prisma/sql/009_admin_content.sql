-- Handoff v2: media sosial, link formulir lamaran, galeri, dan lowongan.
-- Jalankan manual lewat Supabase SQL Editor, lalu:
--   bun --bun run prisma db pull && bun --bun run prisma generate
--
-- WhatsApp sengaja tidak ada — situs tidak memakai WhatsApp (PRODUCT.md).

alter table cms.company_profile
  add column instagram_url    text not null default '',
  add column linkedin_url     text not null default '',
  add column careers_form_url text not null default '';

update cms.company_profile
set instagram_url = 'https://www.instagram.com/ampersada909/',
    linkedin_url  = 'https://www.linkedin.com/company/pt-antar-mitra-persada/'
where id = 1;

-- src: path objek di bucket `gallery`, atau path statis "/…" dari public/.
create table cms.gallery_items (
  id         bigint      generated always as identity primary key,
  src        text        not null,
  caption    text        not null default '',
  sort       integer     not null default 0,
  created_at timestamptz not null default now()
);

create table cms.job_openings (
  id          bigint      generated always as identity primary key,
  title       text        not null,
  location    text        not null default 'Sukoharjo',
  type        text        not null default 'Penuh waktu',
  deadline    date,
  description text        not null default '',
  apply_url   text        not null default '',
  is_open     boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- Sama dengan company_profile: RLS tanpa policy, hanya Prisma yang membaca.
alter table cms.gallery_items enable row level security;
alter table cms.job_openings  enable row level security;

insert into cms.gallery_items (src, caption, sort) values
  ('/graha-berseri.jpg',       'Graha Berseri, Sukoharjo', 0),
  ('/tim-midyear-2025.webp',   'Mid-Year Meeting 2025',    1);

-- Storage: foto diunggah langsung dari browser admin (body fungsi Vercel
-- dibatasi ~4.5 MB), jadi izin tulisnya dijaga di sini, bukan di server action.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gallery', 'gallery', true, 5242880, array['image/jpeg', 'image/png'])
on conflict (id) do nothing;

create or replace function cms.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.pg_users
    -- sama dengan ADMIN_ROLES di require-admin.ts
    where id = auth.uid() and role && array['cms_admin', 'cms.admin']
  );
$$;

grant usage on schema cms to authenticated;
revoke execute on function cms.is_admin() from public, anon;
grant execute on function cms.is_admin() to authenticated;

create policy "cms_admin kelola galeri"
on storage.objects for all to authenticated
using (bucket_id = 'gallery' and (select cms.is_admin()))
with check (bucket_id = 'gallery' and (select cms.is_admin()));
