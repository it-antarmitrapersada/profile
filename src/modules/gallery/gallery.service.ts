import { cache } from "react";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { GALLERY_BUCKET, galleryUrl, type GalleryItem } from "./gallery.dto";

export const listGallery = cache(async (): Promise<GalleryItem[]> => {
  const rows = await prisma.gallery_items.findMany({
    orderBy: [{ sort: "asc" }, { id: "asc" }],
  });
  return rows.map((row) => ({
    id: Number(row.id),
    src: row.src,
    url: galleryUrl(row.src),
    caption: row.caption,
  }));
});

export const addGalleryItem = async (src: string) => {
  const last = await prisma.gallery_items.aggregate({ _max: { sort: true } });
  await prisma.gallery_items.create({
    data: { src, sort: (last._max.sort ?? -1) + 1 },
  });
};

export const updateGalleryCaption = async (id: number, caption: string) => {
  await prisma.gallery_items.update({ where: { id }, data: { caption } });
};

/** Tukar posisi dengan tetangga; urutan ditulis ulang 0..n supaya rapat. */
export const moveGalleryItem = async (id: number, direction: -1 | 1) => {
  const items = await listGallery();
  const from = items.findIndex((item) => item.id === id);
  const to = from + direction;
  if (from < 0 || to < 0 || to >= items.length) return;

  [items[from], items[to]] = [items[to], items[from]];
  await prisma.$transaction(
    items.map((item, sort) =>
      prisma.gallery_items.update({ where: { id: item.id }, data: { sort } }),
    ),
  );
};

export const deleteGalleryItem = async (id: number) => {
  const row = await prisma.gallery_items.delete({ where: { id } });

  // Berkas statis bawaan repo tidak ada di bucket.
  if (!row.src.startsWith("/")) {
    const supabase = await createClient();
    const { error } = await supabase.storage
      .from(GALLERY_BUCKET)
      .remove([row.src]);
    if (error) throw new Error(error.message);
  }
};
