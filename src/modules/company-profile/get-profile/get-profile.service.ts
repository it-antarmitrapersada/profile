import prisma from "@/lib/prisma";
import {
  companyProfileSchema,
  type CompanyProfile,
} from "../company-profile.dto";

/**
 * Baris pasti ada: dibuat oleh 001_create_cms.sql dan dijaga
 * `check (id = 1)` di database, jadi tidak ada cabang "belum ada profil".
 */
export const getProfile = async (): Promise<CompanyProfile> => {
  const row = await prisma.company_profile.findUniqueOrThrow({
    where: { id: 1 },
  });

  // parse, bukan cast — kolom jsonb datang sebagai Prisma.JsonValue
  return companyProfileSchema.parse({
    about: row.about,
    vision: row.vision,
    mission: row.mission,
    coreValues: row.core_values,
    address: row.address,
    phone: row.phone,
    email: row.email,
    mapsEmbedUrl: row.maps_embed_url,
  });
};
