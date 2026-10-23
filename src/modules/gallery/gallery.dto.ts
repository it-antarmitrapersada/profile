import { z } from "zod";

export const GALLERY_BUCKET = "gallery";
export const GALLERY_MAX_BYTES = 5 * 1024 * 1024;
export const GALLERY_TYPES = ["image/jpeg", "image/png"];

// Hanya nama objek hasil unggahan admin (uuid.ext) — bukan URL bebas.
export const galleryPathSchema = z
  .string()
  .regex(/^[\w-]+\.(jpe?g|png)$/, "Nama berkas tidak valid");

export const galleryCaptionSchema = z.object({
  id: z.number().int().positive(),
  caption: z.string().max(200, "Keterangan terlalu panjang"),
});

export const galleryMoveSchema = z.object({
  id: z.number().int().positive(),
  direction: z.union([z.literal(-1), z.literal(1)]),
});

export const galleryIdSchema = z.number().int().positive();

export type GalleryItem = {
  id: number;
  src: string;
  url: string;
  caption: string;
};

/** src "/…" = berkas statis di public/, selain itu objek di bucket. */
export const galleryUrl = (src: string) =>
  src.startsWith("/")
    ? src
    : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${GALLERY_BUCKET}/${src}`;
