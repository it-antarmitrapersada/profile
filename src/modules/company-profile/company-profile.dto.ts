import { z } from "zod";

/**
 * Bentuk kanonik Company Profile. Dipakai tiga arah: validasi server action,
 * parsing kolom jsonb saat dibaca, dan tipe untuk form admin.
 */

export const coreValueSchema = z.object({
  name: z.string().min(1, "Nama nilai wajib diisi"),
  description: z.string().min(1, "Deskripsi nilai wajib diisi"),
});

export const metricSchema = z.object({
  label: z.string().min(1, "Label wajib diisi"),
  // teks, bukan angka: nilainya memuat "+" dan kadang ">"
  value: z.string().min(1, "Angka wajib diisi"),
  note: z.string(),
});

export const companyProfileSchema = z.object({
  about: z.string(),
  vision: z.string(),
  mission: z.array(z.string().min(1, "Poin misi tidak boleh kosong")).max(10),
  // Urutan bermakna: huruf awal tiap nilai membentuk akronim perusahaan.
  coreValues: z.array(coreValueSchema).max(12),

  metrics: z.array(metricSchema).max(6),
  metricsAsOf: z.string(),
  coverage: z.array(z.string().min(1, "Wilayah tidak boleh kosong")).max(40),

  advantageTitle: z.string(),
  advantageBody: z.string(),
  // etalase e-Katalog INAPROC — aksi utama bagi pejabat pengadaan
  catalogUrl: z.union([z.url("URL katalog tidak valid"), z.literal("")]),

  founderName: z.string(),
  founderRole: z.string(),
  founderNote: z.string(),

  address: z.string(),
  phone: z.string(),
  // kosong = belum diisi; selain itu harus alamat yang valid
  email: z.union([z.email("Email tidak valid"), z.literal("")]),
  mapsEmbedUrl: z.union([z.url("URL peta tidak valid"), z.literal("")]),
});

export type CoreValue = z.infer<typeof coreValueSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type CompanyProfile = z.infer<typeof companyProfileSchema>;
