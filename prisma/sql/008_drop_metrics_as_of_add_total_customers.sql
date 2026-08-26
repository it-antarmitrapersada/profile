-- (1) metrics_as_of dihapus total atas keputusan user, termasuk kolomnya.
-- Kode yang mereferensikannya sudah dilepas di commit yang sama — DDL ini
-- aman dijalankan kapan saja setelah kode di-deploy, tidak memblokir build
-- baik sebelum maupun sesudah dijalankan.
alter table cms.company_profile
  drop column metrics_as_of;

-- (2) Angka total pelanggan untuk chip di foto hero — diisi manual lewat
-- admin, tidak dihitung dari data lain. Kosong = chip tidak tampil.
alter table cms.company_profile
  add column total_customers text not null default '';
