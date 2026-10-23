import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** URI telepon RFC-bersih: "(0271) 5994934" -> "tel:02715994934" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;

/** Validasi input server action; gagal = Error dengan pesan zod. */
export const parseOrThrow = <T extends z.ZodType>(
  schema: T,
  input: unknown,
): z.infer<T> => {
  const parsed = schema.safeParse(input);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message);
  return parsed.data;
};
