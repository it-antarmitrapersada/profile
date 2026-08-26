-- Schema `cms`: konten website company profile publik.
-- Terpisah dari `public` yang berisi 85 tabel ERP (pg_*) supaya dua domain
-- tidak tercampur. Penamaan di schema ini Inggris; `public` tetap Indonesia.
--
-- Jalankan manual lewat Supabase SQL Editor, lalu:
--   bun --bun run prisma db pull && bun --bun run prisma generate

create schema if not exists cms;

create table cms.company_profile (
  id             smallint    primary key default 1,
  about          text        not null default '',
  vision         text        not null default '',
  mission        jsonb       not null default '[]'::jsonb,
  core_values    jsonb       not null default '[]'::jsonb,
  address        text        not null default '',
  phone          text        not null default '',
  email          text        not null default '',
  maps_embed_url text        not null default '',
  updated_at     timestamptz not null default now(),
  updated_by     uuid        references auth.users(id) on delete set null,
  -- singleton dijaga database, bukan aplikasi
  constraint company_profile_singleton check (id = 1)
);

-- RLS tanpa policy: Prisma (DATABASE_URL) mem-bypass, anon key tidak bisa baca.
-- Data dibaca aplikasi lewat Prisma, tidak pernah lewat supabase-js.
alter table cms.company_profile enable row level security;

insert into cms.company_profile (id) values (1) on conflict do nothing;
