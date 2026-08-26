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

**Core Value** — prinsip bernama dengan penjelasan singkat. Berbeda dari
Mission: Mission adalah yang perusahaan *lakukan*, Core Value adalah yang
perusahaan *pegang*. Urutannya mengabarkan sesuatu — huruf awal setiap nilai,
dibaca berurutan, membentuk akronim perusahaan. Mengganti nama, menukar
urutan, atau menghapus satu nilai mengubah kata itu.

**Metric** — jumlah instansi yang telah dilayani, selalu disertai keterangan
kapan angka itu berlaku. Klaim yang menua: keterangan waktu adalah bagian
dari maknanya, bukan hiasan. Angka tanpa tanggal tidak bisa diperiksa siapa
pun.

**Coverage** — wilayah tempat perusahaan melayani pelanggan. Daftar sebutan
wilayah sebagaimana perusahaan menyebutnya, bukan pembagian administratif.

**Advantage** — pembeda yang bisa diperiksa oleh calon pembeli. Kalimat yang
bisa diucapkan pesaing mana pun tanpa menjadi bohong bukan Advantage.

**Catalog** — etalase perusahaan di e-Katalog pemerintah, tempat Procurement
Officer benar-benar membelanjakan anggarannya. Satu-satunya tautan di Public
site yang membawa pembaca keluar menuju transaksi; karena itu ia mendapat
bobot visual terbesar, dan tidak berbagi bobot itu dengan tautan lain.

**Procurement Officer** — pembaca utama Public site: pejabat pembuat komitmen
dan pokja pemilihan di rumah sakit, dinas kesehatan, dan puskesmas yang
sedang mencari penyedia di e-Katalog. Setiap keputusan tentang apa yang tampil
lebih dulu diputuskan dari sudut pandang orang ini.

**CMS Admin** — orang yang berhak mengubah Company Profile. Peran ini milik
website, bukan turunan jabatan di sistem internal: menjadi admin di sistem
internal tidak dengan sendirinya menjadikan seseorang CMS Admin.

**Public site** — situs yang dibaca siapa pun tanpa identitas. Hanya membaca,
tidak pernah menulis.

**Internal system** — aplikasi ERP yang sudah berjalan lebih dulu (penjualan,
stok, outlet, pengiriman). Berbagi satu basis data dan satu sumber identitas
dengan Public site, tetapi dua domain yang terpisah; batasnya adalah skema.
