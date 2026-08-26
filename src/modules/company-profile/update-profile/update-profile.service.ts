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
      metrics: input.metrics,
      metrics_as_of: input.metricsAsOf,
      coverage: input.coverage,
      advantage_title: input.advantageTitle,
      advantage_body: input.advantageBody,
      catalog_url: input.catalogUrl,
      pbf_license_no: input.pbfLicenseNo,
      cdob_cert_no: input.cdobCertNo,
      business_id_no: input.businessIdNo,
      founder_name: input.founderName,
      founder_role: input.founderRole,
      founder_note: input.founderNote,
      address: input.address,
      phone: input.phone,
      email: input.email,
      maps_embed_url: input.mapsEmbedUrl,
      updated_at: new Date(),
      updated_by: userId,
    },
  });
};
