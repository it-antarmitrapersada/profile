---
target: /
total_score: 22
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-08-26T07-18-49Z
slug: src-app-public-page-tsx
---
# Critique #2 — Beranda `/` (mode Persuade)

Method: dual-agent. Detector: exit 0, nol temuan (page, layout, section,
nav-link); overlay dilewati (ekstensi tidak tersambung).

## Skor Heuristik (22/28, n/a: 7, 9, 10 — Persuade)

1. Visibility: 3 — "↗" terbaca screen reader di tiga tombol.
2. Match real world: 4 — kosakata pengadaan presisi, klaim bertanggal.
3. User control: 3.
4. Consistency: 3 — "Hubungi Kami" dua wujud satu viewport; teks mati LPSE
   sejajar tautan hidup di footer.
5. Error prevention: 3 — heading penutup hardcode merujuk catalogUrl yang
   bisa kosong.
6. Recognition: 3 — "Data per Oktober 2025" text-xs di luar kartu.
8. Aesthetic: 3 — band penutup + footer melebur (ink-on-ink); paragraf
   Tentang masih display.

## Verdict Spesifisitas

Arsitektur persuasi kini milik produk ini ("Periksa", bukti-dulu, wilayah
bersanding klaim); kulit visual masih transferable — konsisten status
EKSPERIMEN, tercatat bukan pelanggaran.

## Isu Prioritas

1. [P1] Band penutup melebur dengan footer — jadikan panel ink ber-radius di
   atas latar putih. (layout)
2. [P1] Paragraf Tentang diset sebagai display — kalimat pertama jadi
   heading, sisanya body. (typeset)
3. [P2] Heading penutup hardcode merujuk katalog meski catalogUrl bisa
   kosong — heading bercabang. (harden)
4. [P2] Nol sinyal legalitas (izin PBF/CDOB/NIB) — backlog pengadaan konten
   + kolom CMS saat dokumen ada; jangan dikarang.
5. [P3] FULL_SCREEN memotong 4.25rem padahal header mobile dua baris —
   nilai ber-breakpoint. (adapt)

## Persona Red Flags

- Jordan: BMHP/PBF/INAPROC tanpa penjelas di lipatan pertama.
- Riley: about tanpa baris kosong → seluruh teks jadi headline (tanpa
  guard); metrik ke-4 → grid 3+1 timpang.
- Casey: header sticky 2 baris makan 13% viewport; tel: satu-tap bagus.
- Bu Rina: tanpa izin harus cari sumber lain; gmail di momen keputusan;
  "8 wilayah" campur granularitas; BERSERI GROUP tanpa jalan verifikasi.

## Observasi Minor

aria-hidden untuk "↗"; pemenggalan wordmark; token .dark bobot mati;
::selection & stagger dinilai halus.

## Pertanyaan

1. Perlihatkan isi etalase (jumlah produk/kategori) sebagai data admin?
2. Gmail di band penutup: tampil atau cukup telepon + katalog?
3. Kalau warna & font diganti, apa yang tersisa terasa AMP? Hari ini: konten.
