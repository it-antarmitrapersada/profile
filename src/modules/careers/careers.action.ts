"use server";

import { revalidatePath } from "next/cache";
import { parseOrThrow } from "@/lib/utils";
import { requireAdmin } from "@/modules/auth/require-admin";
import { jobIdSchema, jobOpenSchema, saveJobSchema } from "./careers.dto";
import { deleteJob, saveJob, setJobOpen } from "./careers.service";

const refresh = () => {
  revalidatePath("/careers");
  // sidebar admin memuat jumlah lowongan dibuka
  revalidatePath("/admin", "layout");
};

export const saveJobAction = async (input: unknown) => {
  await requireAdmin();
  const { id, job } = parseOrThrow(saveJobSchema, input);
  await saveJob(id, job);
  refresh();
};

export const setJobOpenAction = async (input: unknown) => {
  await requireAdmin();
  const { id, isOpen } = parseOrThrow(jobOpenSchema, input);
  await setJobOpen(id, isOpen);
  refresh();
};

export const deleteJobAction = async (input: unknown) => {
  await requireAdmin();
  await deleteJob(parseOrThrow(jobIdSchema, input));
  refresh();
};
