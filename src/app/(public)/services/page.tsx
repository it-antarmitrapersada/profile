import type { Metadata } from "next";
import Link from "next/link";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Chip } from "@/components/section";

export const metadata: Metadata = {
  title: "Layanan | PT. Antar Mitra Persada",
  description:
    "Pengadaan obat, BMHP, dan alat kesehatan melalui LPSE dan e-Katalog INAPROC dengan sistem satu pintu.",
};

export default async function ServicesPage() {
  const { advantageTitle, advantageBody, catalogUrl } = await getProfile();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Chip>Layanan Pengadaan</Chip>
      <h1 className="mt-4 max-w-[20ch] text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        {advantageTitle || "Layanan"}
      </h1>

      {advantageBody && (
        <div className="mt-10 max-w-3xl rounded-3xl bg-muted p-8 sm:p-10">
          <p className="leading-relaxed whitespace-pre-line">{advantageBody}</p>
        </div>
      )}

      {/* Banner ajakan: satu-satunya panel gelap di halaman ini. */}
      <section className="mt-16 rounded-3xl bg-ink px-8 py-12 text-ink-foreground sm:px-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="max-w-[24ch] text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
              Mulai pengadaan lewat e-Katalog hari ini.
            </h2>
            <p className="mt-2 text-ink-foreground/70">
              Seluruh kebutuhan obat, BMHP, dan alat kesehatan dari satu
              penyedia.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {catalogUrl && (
              <a
                href={catalogUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
              >
                Lihat Katalog INAPROC ↗
              </a>
            )}
            <Link
              href="/contact"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
