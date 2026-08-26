-- Materi resmi PT Antar Mitra Persada.
--
-- CATATAN 1 — `about` ditulis ulang. Isi lamanya (paragraf LPSE/INAPROC) adalah
-- penjelasan layanan, bukan profil perusahaan; paragraf itu pindah ke
-- advantage_body. Hapus baris `about = ...` di bawah kalau Anda tidak setuju.
--
-- CATATAN 2 — materi asli memuat paragraf "hadir dengan komitmen..." dua kali
-- dengan sedikit perbedaan. Dipakai versi yang lebih lengkap.
--
-- CATATAN 3 — vision, mission, core_values, dan kontak TIDAK disentuh.
--
-- CATATAN 4 — periksa dulu apakah angka 120/40/770 masih berlaku. Materinya
-- bertanggal Oktober 2025 dan pembaca yang disasar paling mungkin memeriksanya.

update cms.company_profile
set
  about = 'PT Antar Mitra Persada adalah perusahaan distributor obat-obatan, alat kesehatan, dan Pedagang Besar Farmasi (PBF) berskala nasional, yang berdiri pada tahun 2021 di Sukoharjo, Jawa Tengah.

Perusahaan ini merupakan bagian dari BERSERI GROUP, grup perusahaan yang bergerak di berbagai unit usaha: infrastruktur khususnya aspal, farmasi, distribusi, dan properti.

PT Antar Mitra Persada hadir dengan komitmen untuk mendukung peningkatan pelayanan kesehatan di seluruh fasilitas kesehatan di Indonesia melalui penyediaan produk yang berkualitas, aman, dan terpercaya. Dengan semangat profesionalisme dan integritas, kami senantiasa berupaya memberikan layanan distribusi yang cepat, tepat, dan ramah, guna memastikan ketersediaan produk kesehatan yang dibutuhkan masyarakat maupun fasilitas layanan kesehatan.',

  advantage_title = 'Sistem Satu Pintu',
  advantage_body = 'PT Antar Mitra Persada melayani kebutuhan obat-obatan dan alat kesehatan seluruh fasilitas kesehatan di Indonesia melalui platform Pengadaan Barang/Jasa Pemerintah (LPSE) dan e-Katalog INAPROC.

Pembelian via e-Katalog dilayani dengan sistem satu pintu untuk semua merek dan prinsipal, mencakup obat, BMHP, dan alat kesehatan sekaligus. Satu penyedia untuk seluruh kebutuhan pengadaan rumah sakit dan pusat layanan kesehatan, ditangani secara cepat, tepat, dan ramah.

Pelayanan berjalan melalui jalur e-katalog sektoral Kementerian Kesehatan, dan sejak Oktober 2025 menggunakan e-Katalog versi 6 / INAPROC.',

  metrics = jsonb_build_array(
    jsonb_build_object('label', 'Rumah Sakit',     'value', '120+', 'note', 'RS pemerintah dan swasta di Indonesia'),
    jsonb_build_object('label', 'Dinas Kesehatan', 'value', '40+',  'note', 'Dinkes kabupaten dan kota di Indonesia'),
    jsonb_build_object('label', 'Puskesmas',       'value', '770+', 'note', 'Puskesmas di berbagai daerah di Indonesia')
  ),
  metrics_as_of = 'per Oktober 2025',

  -- Ditulis persis sebagaimana materi aslinya menyebutkan wilayah, tanpa
  -- memecah "pulau Jawa" menjadi provinsi — itu akan jadi tafsir, bukan data.
  coverage = jsonb_build_array(
    'Aceh', 'Sumatera Utara', 'Banten', 'DKI Jakarta',
    'Pulau Jawa', 'Kalimantan', 'Sulawesi', 'Nusa Tenggara'
  ),

  founder_name = 'Agung Dwi Sulistyo',
  founder_role = 'Owner, BERSERI GROUP',
  founder_note = 'Putra asli Sukoharjo, Jawa Tengah. Beliau mendirikan PT Antar Mitra Persada sebagai salah satu anak perusahaan BERSERI GROUP untuk dapat berkontribusi secara nyata dalam bidang kesehatan di Indonesia.',

  updated_at = now()
where id = 1;
