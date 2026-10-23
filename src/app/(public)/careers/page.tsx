import type { Metadata } from "next";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import {
  Eyebrow,
  HeroAction,
  PageHero,
  ValueGrid,
} from "@/components/section";

export const metadata: Metadata = {
  title: "Karir",
  description: "Bekerja bersama PT. Antar Mitra Persada di Sukoharjo.",
};

export default async function CareersPage() {
  const { coreValues } = await getProfile();

  return (
    <>
      {/* ponytail: tombol "Isi formulir lamaran ↗" menunggu kolom
          `careers_form_url` di CMS — tanpa URL asli, tidak ada tombol. */}
      <PageHero eyebrow="Karir" title="Bekerja bersama kami di Sukoharjo.">
        <HeroAction text="Lamaran untuk seluruh posisi diterima melalui formulir daring. Tim kami akan menghubungi kandidat yang sesuai." />
      </PageHero>

      {coreValues.length > 0 && (
        <section className="wrap pb-[clamp(80px,11vw,140px)]">
          <Eyebrow className="mb-8 border-t border-foreground pt-10">
            Nilai yang kami pegang
          </Eyebrow>
          <ValueGrid values={coreValues} compact />
        </section>
      )}
    </>
  );
}
