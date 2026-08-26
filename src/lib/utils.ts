import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** URI telepon RFC-bersih: "(0271) 5994934" -> "tel:02715994934" */
export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
