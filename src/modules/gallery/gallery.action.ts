"use server";

import { revalidatePath } from "next/cache";
import { parseOrThrow } from "@/lib/utils";
import { requireAdmin } from "@/modules/auth/require-admin";
import {
  galleryCaptionSchema,
  galleryIdSchema,
  galleryMoveSchema,
  galleryPathSchema,
} from "./gallery.dto";
import {
  addGalleryItem,
  deleteGalleryItem,
  moveGalleryItem,
  updateGalleryCaption,
} from "./gallery.service";

const refresh = () => {
  revalidatePath("/gallery");
  // sidebar admin memuat jumlah foto
  revalidatePath("/admin", "layout");
};

/** Berkasnya sudah diunggah browser ke Storage; di sini hanya dicatat. */
export const addGalleryItemAction = async (input: unknown) => {
  await requireAdmin();
  await addGalleryItem(parseOrThrow(galleryPathSchema, input));
  refresh();
};

export const updateGalleryCaptionAction = async (input: unknown) => {
  await requireAdmin();
  const { id, caption } = parseOrThrow(galleryCaptionSchema, input);
  await updateGalleryCaption(id, caption);
  refresh();
};

export const moveGalleryItemAction = async (input: unknown) => {
  await requireAdmin();
  const { id, direction } = parseOrThrow(galleryMoveSchema, input);
  await moveGalleryItem(id, direction);
  refresh();
};

export const deleteGalleryItemAction = async (input: unknown) => {
  await requireAdmin();
  await deleteGalleryItem(parseOrThrow(galleryIdSchema, input));
  refresh();
};
