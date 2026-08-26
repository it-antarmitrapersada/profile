# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Utama: pejabat pengadaan fasilitas kesehatan — PPK/Pokja Pemilihan di rumah
sakit, dinas kesehatan, dan puskesmas — yang sedang menilai dan memilih
penyedia obat/alkes di e-Katalog. Mereka membandingkan penyedia, memeriksa
klaim, dan membelanjakan anggaran publik lewat jalur resmi.

Kedua: apotek dan klinik swasta — pembeli non-pemerintah di luar jalur
e-Katalog.

Bukan audiens saat ini (keputusan eksplisit, bukan kelalaian): prinsipal/
pabrikan yang mencari distributor, dan pelamar kerja. Halaman karier pernah
disebut sebagai kemungkinan masa depan, belum menjadi rencana.

## Product Purpose

Website company profile PT. Antar Mitra Persada. Dua tugas: menarik customer
baru dan memperkenalkan perusahaan. Sukses berarti pengunjung yang tepat
sampai pada salah satu jalur kontak yang dilayani (lihat Operating Context)
dengan cukup kepercayaan untuk melangkah.

Konten dikelola non-developer lewat CMS di `/admin`; halaman publik membaca
satu baris `cms.company_profile` per request (tanpa cache, perubahan admin
langsung tayang).

## Positioning

- Distributor obat-obatan, alat kesehatan, dan Pedagang Besar Farmasi (PBF)
  berskala nasional; berdiri 2021 di Sukoharjo, Jawa Tengah.
- Bagian dari BERSERI GROUP (infrastruktur/aspal, farmasi, distribusi,
  properti) — sinyal bonafiditas korporat.
- Pembeda yang bisa diperiksa: sistem satu pintu di e-Katalog — satu penyedia
  untuk obat, BMHP, dan alkes dari semua merek dan prinsipal. Etalase:
  https://katalog.inaproc.id/antar-mitra-persada
- Empat slogan generik lama (PRODUK BERKUALITAS dst.) sengaja dibuang dari
  situs; klaim yang bisa diucapkan pesaing mana pun tanpa menjadi bohong
  bukan pembeda.

## Operating Context

- Pembeli pemerintah bekerja di LPSE dan e-Katalog INAPROC (sejak Oktober
  2025 e-Katalog v6); transaksi terjadi di sana, bukan di situs ini.
- Jalur kontak yang dilayani: telepon kantor, email, dan langsung ke etalase
  e-Katalog. WhatsApp sengaja tidak dipakai.
- Bahasa konten: Indonesia. Slug URL dan penamaan kode: Inggris.
- Situs publik tanpa login; hanya `/admin` yang berautentikasi (Supabase,
  role `cms_admin` di `pg_users.role`).

## Capabilities and Constraints

- Konten CMS: about, vision, mission, core values, metrics, coverage
  wilayah, advantage, profil owner, kontak, URL peta, URL katalog, sinyal
  legalitas (nomor izin PBF, sertifikat CDOB, NIB), total pelanggan (chip
  foto hero, angka manual). Semua di satu tabel singleton
  `cms.company_profile`.
- Sinyal legalitas ditampilkan di beranda dekat kartu metrics — titik
  pemeriksaan pertama pejabat pengadaan. Kosong = field itu tidak tayang.
  Isi hanya nomor asli dari dokumen resmi lewat `/admin`; tidak pernah
  dikarang oleh siapa pun yang mengerjakan situs ini.
- Metrics (120+ RS, 40+ Dinkes, 770+ Puskesmas) tidak lagi membawa
  keterangan tanggal — kolom `metrics_as_of` dihapus atas keputusan
  eksplisit user meski itu berlawanan dengan prinsip "klaim membawa
  tanggalnya" yang disarankan; dicatat di sini supaya jelas ini pilihan
  sadar, bukan regresi yang terlewat.
- Jangan pernah mengarang: testimoni, nomor izin, sertifikat, angka, klaim
  layanan, atau prosedur pengadaan. Audiens utama adalah orang yang paling
  mampu memeriksa.
- Database dibagi dengan ERP internal produksi; schema `cms` milik situs,
  schema `public` (pg_*) milik ERP dan tidak disentuh dari sini. DDL
  dijalankan manual (file di `prisma/sql/`), lalu `prisma db pull`.
- Alur langkah pembelian e-Katalog belum ada materinya — jangan dikarang.
- Glosarium domain: `CONTEXT.md` di root repo.

## Brand Commitments

- Nama: PT. Antar Mitra Persada (kadang disingkat PT. AM Persada).
- Nilai perusahaan adalah akronim HEBAT — Humanis, Empati, Briliant,
  Antusias, Taqwa. Urutan membentuk kata; mengubah urutan/nama/jumlah
  mengubah kata itu. Ini fakta produk, bukan pilihan desain.
- Profil owner (Agung Dwi Sulistyo, Owner BERSERI GROUP) tayang atas
  keputusan user.
- Identitas visual saat ini (hijau apotek, Plus Jakarta Sans, monogram AM)
  berstatus EKSPERIMEN — bukan komitmen. Boleh diganti total tanpa melanggar
  apa pun. Belum ada logo resmi; monogram AM adalah placeholder satu-tempat-
  ganti di `src/app/(public)/layout.tsx`.

## Evidence on Hand

- Konten nyata terisi di database: visi, misi, HEBAT, metrics, 8 wilayah
  coverage, advantage satu pintu, profil owner, alamat
  Graha Berseri Sukoharjo, telepon (0271) 5994934, email
  ampersada7@gmail.com, embed Google Maps, URL katalog INAPROC.
- Aset gambar: hanya `public/warehouse.jpg`. Belum ada logo resmi, foto
  kantor/armada/tim, atau akun media sosial. Ketiadaan ini tidak boleh
  ditambal dengan aset karangan atau tautan mati.
- Email kontak masih gmail; email berdomain sendiri belum ada keputusan.

## Product Principles

1. Bukti sebelum narasi — angka, jangkauan, dan etalase katalog mendahului
   cerita perusahaan, karena pembacanya sedang menilai penyedia.
2. Semua klaim bisa diperiksa; klaim yang menua membawa tanggalnya.
3. Satu sumber konten (CMS) — desain tidak boleh butuh developer untuk
   pembaruan teks rutin.
4. Hanya tayangkan yang ada — tanpa slot kosong, tautan mati, atau bagian
   "coming soon".
5. Audiens kedua (apotek/klinik swasta) tidak boleh mengaburkan pesan utama
   ke pembeli pengadaan.
