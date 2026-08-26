import { expect, test } from "vitest";
import {
  companyProfileSchema,
  coreValueSchema,
} from "../modules/company-profile/company-profile.dto";

const valid = {
  about: "",
  vision: "",
  mission: [],
  coreValues: [],
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

test("core value wajib punya nama, deskripsi, dan ikon", () => {
  expect(
    coreValueSchema.safeParse({
      name: "Integritas",
      description: "Jujur dalam setiap transaksi.",
      icon: "shield",
    }).success,
  ).toBe(true);

  expect(
    coreValueSchema.safeParse({
      name: "",
      description: "Jujur dalam setiap transaksi.",
      icon: "shield",
    }).success,
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
