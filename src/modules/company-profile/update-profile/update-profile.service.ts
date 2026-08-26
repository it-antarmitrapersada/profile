import prisma from "@/lib/prisma";
import type { CompanyProfile } from "../company-profile.dto";

export const updateProfile = async (
  input: CompanyProfile,
  userId: string,
): Promise<void> => {
  await prisma.company_profile.update({
    where: { id: 1 },
    data: {
      about: input.about,
      vision: input.vision,
      mission: input.mission,
      core_values: input.coreValues,
      address: input.address,
      phone: input.phone,
      email: input.email,
      maps_embed_url: input.mapsEmbedUrl,
      updated_at: new Date(),
      updated_by: userId,
    },
  });
};
