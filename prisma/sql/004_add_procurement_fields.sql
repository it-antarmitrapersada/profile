-- Materi perusahaan yang sebenarnya tidak muat di model awal. Kolom baru untuk
-- bukti sebagai penyedia (angka instansi terlayani, sebaran wilayah), keunggulan
-- sistem satu pintu, dan profil Owner.
--
-- Aturan yang dipakai: jsonb untuk daftar berulang, kolom teks untuk field
-- tunggal. Owner berbentuk tetap tiga field, jadi kolom teks — bukan jsonb.
--
-- Jalankan manual, lalu:
--   bun --bun run prisma db pull && bun --bun run prisma generate

alter table cms.company_profile
  add column metrics         jsonb not null default '[]'::jsonb,
  add column metrics_as_of   text  not null default '',
  add column coverage        jsonb not null default '[]'::jsonb,
  add column advantage_title text  not null default '',
  add column advantage_body  text  not null default '',
  add column founder_name    text  not null default '',
  add column founder_role    text  not null default '',
  add column founder_note    text  not null default '';
