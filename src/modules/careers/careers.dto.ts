import { z } from "zod";

export const JOB_TYPES = ["Penuh waktu", "Kontrak", "Magang"] as const;

export const jobSchema = z.object({
  title: z.string().trim().min(1, "Posisi wajib diisi"),
  location: z.string().trim(),
  type: z.enum(JOB_TYPES),
  // "" = tanpa batas lamaran
  deadline: z.union([z.iso.date("Tanggal tidak valid"), z.literal("")]),
  description: z.string(),
  applyUrl: z.union([z.url("Link lamaran tidak valid"), z.literal("")]),
});

export const saveJobSchema = z.object({
  id: z.number().int().positive().nullable(),
  job: jobSchema,
});

export const jobOpenSchema = z.object({
  id: z.number().int().positive(),
  isOpen: z.boolean(),
});

export const jobIdSchema = z.number().int().positive();

export type JobInput = z.infer<typeof jobSchema>;
export type Job = JobInput & { id: number; isOpen: boolean };

const MONTHS = "Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des".split(" ");

/** "2026-11-30" -> "30 Nov 2026" */
export const formatDate = (date: string) => {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
};
