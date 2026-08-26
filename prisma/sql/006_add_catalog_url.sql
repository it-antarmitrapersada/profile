-- Tautan etalase e-Katalog INAPROC. Untuk pejabat pengadaan, ini aksi paling
-- berharga di seluruh situs — jalan langsung dari "perusahaan ini meyakinkan"
-- ke "saya bisa belanja sekarang". DDL dan isinya digabung karena satu kolom.

alter table cms.company_profile
  add column catalog_url text not null default '';

update cms.company_profile
set catalog_url = 'https://katalog.inaproc.id/antar-mitra-persada',
    updated_at  = now()
where id = 1;
