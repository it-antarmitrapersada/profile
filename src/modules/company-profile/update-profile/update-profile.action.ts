"use server";

import { requireAdmin } from "@/modules/auth/require-admin";
import { companyProfileSchema } from "../company-profile.dto";
import { updateProfile } from "./update-profile.service";

export const updateProfileAction = async (input: unknown) => {
  // Server Action adalah endpoint tersendiri yang bisa dipanggil langsung —
  // guard di layout /admin tidak melindunginya.
  const { userId } = await requireAdmin();

  const parsed = companyProfileSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  await updateProfile(parsed.data, userId);
};
