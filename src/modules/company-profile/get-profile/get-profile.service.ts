import { cache } from "react";
import prisma from "@/lib/prisma";
import {
  companyProfileSchema,
  type CompanyProfile,
} from "../company-profile.dto";

/**
 * Baris pasti ada: dibuat oleh 001_create_cms.sql dan dijaga
 * `check (id = 1)` di database, jadi tidak ada cabang "belum ada profil".
 *
 * Dibungkus cache(): layout (footer) dan page memanggilnya dalam satu request,
 * dan React men-dedupe-nya jadi satu query.
 */
export const getProfile = cache(async (): Promise<CompanyProfile> => {
  const row = await prisma.company_profile.findUniqueOrThrow({
    where: { id: 1 },
  });

  // parse, bukan cast — kolom jsonb datang sebagai Prisma.JsonValue.
  // Zod sekaligus menyaring field lama yang sudah tidak dipakai (mis. `icon`).
  return companyProfileSchema.parse({
    about: row.about,
    vision: row.vision,
    mission: row.mission,
    coreValues: row.core_values,
    metrics: row.metrics,
    metricsAsOf: row.metrics_as_of,
    coverage: row.coverage,
    advantageTitle: row.advantage_title,
    advantageBody: row.advantage_body,
    catalogUrl: row.catalog_url,
    pbfLicenseNo: row.pbf_license_no,
    cdobCertNo: row.cdob_cert_no,
    businessIdNo: row.business_id_no,
    founderName: row.founder_name,
    founderRole: row.founder_role,
    founderNote: row.founder_note,
    address: row.address,
    phone: row.phone,
    email: row.email,
    mapsEmbedUrl: row.maps_embed_url,
  });
});
