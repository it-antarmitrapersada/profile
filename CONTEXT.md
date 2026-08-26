# Context

Glosarium domain untuk website company profile PT. Antar Mitra Persada.
Berisi *arti istilah* saja — bukan spesifikasi, bukan catatan implementasi.

## Bahasa

Penamaan kode dan basis data memakai bahasa Inggris. Pengecualian yang
disengaja: skema `public` warisan sistem internal tetap berbahasa Indonesia
(`pg_penjualan`, `nama_gudang`). Batas antara dua bahasa itu adalah skema,
bukan tabel per tabel. Teks yang dibaca pengunjung selalu bahasa Indonesia.

## Istilah

**Company Profile** — konten kanonik tentang perusahaan yang dibaca publik.
Tepat satu, tidak pernah nol dan tidak pernah lebih dari satu. Mencakup
narasi perusahaan, Vision, Mission, Core Value, dan informasi kontak.

**Vision** — satu pernyataan naratif tentang arah perusahaan. Tunggal.

**Mission** — pernyataan tentang cara mencapai Vision. Bisa berupa satu
paragraf utuh, bisa juga terpecah menjadi beberapa poin terurut — keduanya
Mission yang sama, hanya beda tingkat rincian. Saat terpecah, urutannya
bermakna; poin tanpa isi bukan poin.

**Core Value** — prinsip bernama dengan penjelasan singkat. Ada beberapa,
terurut, dan masing-masing berdiri sendiri. Berbeda dari Mission: Mission
adalah yang perusahaan *lakukan*, Core Value adalah yang perusahaan
*pegang*.

**CMS Admin** — orang yang berhak mengubah Company Profile. Peran ini milik
website, bukan turunan jabatan di sistem internal: menjadi admin di sistem
internal tidak dengan sendirinya menjadikan seseorang CMS Admin.

**Public site** — situs yang dibaca siapa pun tanpa identitas. Hanya membaca,
tidak pernah menulis.

**Internal system** — aplikasi ERP yang sudah berjalan lebih dulu (penjualan,
stok, outlet, pengiriman). Berbagi satu basis data dan satu sumber identitas
dengan Public site, tetapi dua domain yang terpisah; batasnya adalah skema.
