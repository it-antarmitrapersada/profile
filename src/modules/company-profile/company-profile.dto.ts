import { z } from "zod";

/**
 * Bentuk kanonik Company Profile. Dipakai tiga arah: validasi server action,
 * parsing kolom jsonb saat dibaca, dan tipe untuk form admin.
 */

export const coreValueSchema = z.object({
  name: z.string().min(1, "Nama nilai wajib diisi"),
  description: z.string().min(1, "Deskripsi nilai wajib diisi"),
  // nama ikon lucide-react, bukan file — tanpa upload, tanpa storage
  icon: z.string().min(1, "Ikon wajib dipilih"),
});

export const companyProfileSchema = z.object({
  about: z.string(),
  vision: z.string(),
  mission: z.array(z.string().min(1, "Poin misi tidak boleh kosong")).max(10),
  coreValues: z.array(coreValueSchema).max(12),
  address: z.string(),
  phone: z.string(),
  // kosong = belum diisi; selain itu harus alamat yang valid
  email: z.union([z.email("Email tidak valid"), z.literal("")]),
  mapsEmbedUrl: z.union([z.url("URL peta tidak valid"), z.literal("")]),
});

export type CoreValue = z.infer<typeof coreValueSchema>;
export type CompanyProfile = z.infer<typeof companyProfileSchema>;
