import type { Metadata } from "next";
import Link from "next/link";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Eyebrow, SectionHeading } from "@/components/section";

export const metadata: Metadata = {
  title: "Layanan | PT. Antar Mitra Persada",
  description:
    "Pengadaan obat, BMHP, dan alat kesehatan melalui LPSE dan e-Katalog INAPROC dengan sistem satu pintu.",
};

export default async function ServicesPage() {
  const { advantageTitle, advantageBody, coverage, catalogUrl } =
    await getProfile();

  return (
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pt-28">
      <Eyebrow>Layanan Pengadaan</Eyebrow>
      <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.03em]">
        {advantageTitle || "Layanan"}
      </h1>

      {advantageBody && (
        <p className="mt-10 max-w-[62ch] font-body text-lg leading-[1.7] whitespace-pre-line">
          {advantageBody}
        </p>
      )}

      {coverage.length > 0 && (
        <section className="mt-20">
          <SectionHeading eyebrow="Jangkauan">
            Wilayah yang kami layani
          </SectionHeading>
          <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-3">
            {coverage.map((area) => (
              <li
                key={area}
                className="border px-3 py-1.5 font-mono text-[0.6875rem] tracking-[0.12em] uppercase"
              >
                {area}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-t pt-8">
        {catalogUrl && (
          <a
            href={catalogUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-primary px-5 py-3 font-mono text-[0.6875rem] tracking-[0.14em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Lihat Katalog INAPROC ↗
          </a>
        )}
        <Link
          href="/contact"
          className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase underline-offset-8 hover:text-foreground hover:underline"
        >
          Hubungi Kami →
        </Link>
      </div>
    </div>
  );
}
