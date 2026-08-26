-- Sinyal legalitas untuk pejabat pengadaan: item checklist kualifikasi
-- penyedia (izin PBF, sertifikat CDOB, NIB). Kosong = tidak ditampilkan;
-- jangan pernah diisi nomor karangan — hanya nomor asli dari dokumen resmi.

alter table cms.company_profile
  add column pbf_license_no  text not null default '',
  add column cdob_cert_no    text not null default '',
  add column business_id_no  text not null default '';  -- NIB
