---
target: /
total_score: 21
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-26T06-58-52Z
slug: src-app-public-page-tsx
---
# Critique — Beranda `/` (mode Persuade)

Method: dual-agent (A: agen review desain · B: agen detector deterministik).
Detector: exit 0, nol temuan, nol false positive; overlay browser dilewati
(ekstensi tidak tersambung). Bukti visual: shots/beranda-desktop.png +
shots/beranda-mobile.png.

## Skor Heuristik (21/28, n/a: 7, 9, 10 — Persuade)

1. Visibility of status: 2 — nav tanpa penanda halaman aktif (aria-current).
2. Match real world: 4 — bahasa pengadaan presisi; klaim bertanggal.
3. User control: 3 — reduced-motion ok; CTA header hilang di mobile.
4. Consistency: 3 — "Hubungi Kami" dua gaya; teks mati sejajar tautan hidup di footer.
5. Error prevention: 3 — tel: URI tidak dinormalisasi (spasi + kurung).
6. Recognition: 3 — chip mengambang menduplikasi metric 770+.
8. Aesthetic/minimalist: 3 — duplikasi 770+; lembah whitespace desktop.

## Verdict Spesifisitas

Setengah spesifik: konten milik perusahaan ini, komposisi bisa dipakai pesaing
tanpa ubah CSS. Fatal: pembeda satu pintu tidak pernah diucapkan di beranda
padahal `advantage` tersedia dari getProfile().

## Isu Prioritas

1. [P1] Pembeda "satu pintu" absen dari beranda — tampilkan `advantage` sebagai
   section antara metrics dan Tentang + tautan verifikasi etalase. (bolder)
2. [P1] Chip mengambang menduplikasi metric 770+ — isi dengan datum lain
   (mis. "8 wilayah jangkauan" dari coverage.length) atau hapus. (distill)
3. [P2] Tidak ada penutup halaman — band ink berisi CTA + kontak sebelum
   footer; kesan terakhir saat ini adalah email gmail. (bolder)
4. [P2] Lembah whitespace desktop — lepas min-h FULL_SCREEN di section
   Tentang, biarkan py-24. (layout)
5. [P3] Nav tanpa indikator aktif + CTA header hilang di mobile —
   aria-current + tampilkan CTA di header mobile. (polish)

## Persona Red Flags

- Jordan: "PBF" dan "INAPROC" tanpa penjelasan di paparan pertama.
- Riley: chip 770+ tampak interaktif tapi bukan link; tel: kotor; taksonomi
  wilayah campur (Pulau Jawa vs DKI/Banten); teks mati footer tampak klik-able.
- Casey: header 2 baris makan viewport; tanpa CTA sticky; zona ibu jari padat
  (chip vs kartu -mt-20).
- Bu Rina (PPK): nol sinyal legalitas (izin PBF/CDOB/NIB — gap konten, jangan
  dikarang); daftar wilayah tidak membuktikan "nasional"; gmail dicatat saat
  menilai bonafiditas; subteks hero = klaim tak-terperiksa.

## Observasi Minor

figcaption dipaksakan untuk chip stat; "Data per Oktober 2025" yatim; Chip
dirender <p>; --sidebar-primary masih lime hue 131 (akan bocor di /admin);
delay animasi hardcode per elemen.

## Pertanyaan

1. Kenapa klaim satu pintu tidak diucapkan di satu-satunya halaman yang pasti
   dibaca semua orang?
2. Apotek/klinik swasta: tidak mengaburkan pesan utama, atau tidak terlihat
   sama sekali?
3. Beranikah memindahkan visi ke /about dan mengisi slot hero dengan klaim
   yang bisa diperiksa?
