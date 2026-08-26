import { expect, test } from "vitest";
import {
  companyProfileSchema,
  coreValueSchema,
  metricSchema,
} from "../modules/company-profile/company-profile.dto";

const valid = {
  about: "",
  vision: "",
  mission: [],
  coreValues: [],
  metrics: [],
  coverage: [],
  advantageTitle: "",
  advantageBody: "",
  catalogUrl: "",
  totalCustomers: "",
  pbfLicenseNo: "",
  cdobCertNo: "",
  businessIdNo: "",
  founderName: "",
  founderRole: "",
  founderNote: "",
  address: "",
  phone: "",
  email: "",
  mapsEmbedUrl: "",
};

test("profil kosong itu sah — baris dibuat dengan default kosong", () => {
  expect(companyProfileSchema.safeParse(valid).success).toBe(true);
});

test("poin misi kosong ditolak", () => {
  expect(
    companyProfileSchema.safeParse({ ...valid, mission: ["Poin", ""] }).success,
  ).toBe(false);
});

test("core value wajib punya nama dan deskripsi", () => {
  expect(
    coreValueSchema.safeParse({
      name: "Humanis",
      description: "Menghargai dan peduli pada sesama.",
    }).success,
  ).toBe(true);

  expect(
    coreValueSchema.safeParse({
      name: "",
      description: "Menghargai dan peduli pada sesama.",
    }).success,
  ).toBe(false);
});

test("ikon tidak lagi jadi bagian core value — huruf awal yang dipakai", () => {
  const parsed = coreValueSchema.parse({
    name: "Empati",
    description: "Merasakan dan memahami perasaan orang lain.",
    icon: "handshake",
  });

  expect(parsed).not.toHaveProperty("icon");
});

test("metric wajib punya label dan angka, keterangan boleh kosong", () => {
  expect(
    metricSchema.safeParse({ label: "Rumah Sakit", value: "120+", note: "" })
      .success,
  ).toBe(true);

  expect(
    metricSchema.safeParse({ label: "Rumah Sakit", value: "", note: "" })
      .success,
  ).toBe(false);
});

test("email boleh kosong tapi tidak boleh asal", () => {
  expect(companyProfileSchema.safeParse({ ...valid, email: "" }).success).toBe(
    true,
  );
  expect(
    companyProfileSchema.safeParse({ ...valid, email: "info@amp.co.id" })
      .success,
  ).toBe(true);
  expect(
    companyProfileSchema.safeParse({ ...valid, email: "bukan-email" }).success,
  ).toBe(false);
});

test("URL peta boleh kosong tapi tidak boleh asal", () => {
  expect(
    companyProfileSchema.safeParse({ ...valid, mapsEmbedUrl: "" }).success,
  ).toBe(true);
  expect(
    companyProfileSchema.safeParse({
      ...valid,
      mapsEmbedUrl: "https://www.google.com/maps/embed?pb=x",
    }).success,
  ).toBe(true);
  expect(
    companyProfileSchema.safeParse({ ...valid, mapsEmbedUrl: "maps" }).success,
  ).toBe(false);
});

test("tautan katalog boleh kosong tapi tidak boleh asal", () => {
  expect(companyProfileSchema.safeParse({ ...valid, catalogUrl: "" }).success).toBe(
    true,
  );
  expect(
    companyProfileSchema.safeParse({
      ...valid,
      catalogUrl: "https://katalog.inaproc.id/antar-mitra-persada",
    }).success,
  ).toBe(true);
  expect(
    companyProfileSchema.safeParse({ ...valid, catalogUrl: "katalog.inaproc.id" })
      .success,
  ).toBe(false);
});
