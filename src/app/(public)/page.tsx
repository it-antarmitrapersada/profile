import Image from "next/image";
import Link from "next/link";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Chip } from "@/components/section";

// Tinggi header sticky, dipotong dari tinggi layar supaya hero mengisi
// satu layar penuh tanpa terdorong keluar.
const FULL_SCREEN = "min-h-[calc(100svh-4.25rem)]";

export default async function HomePage() {
  const { vision, about, metrics, metricsAsOf, coverage, catalogUrl } =
    await getProfile();

  // Dipotong di batas paragraf: penulisnya sudah menentukan di mana satu
  // gagasan selesai.
  const [lead, second] = about.split(/\n\s*\n/);
  const floatingMetric = metrics[metrics.length - 1];

  return (
    <>
      {/* Hero panel ink. Headline hardcode dan faktual — deskripsi usaha,
          bukan klaim; visi dari CMS jadi subteksnya. */}
      <section className={`bg-ink text-ink-foreground ${FULL_SCREEN} flex`}>
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-14 pb-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Chip onDark className="rise">
              Distributor Farmasi · PBF
            </Chip>
            <h1
              className="rise mt-6 max-w-[18ch] text-4xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-5xl"
              style={{ animationDelay: "60ms" }}
            >
              Mitra distribusi obat dan alat kesehatan untuk fasilitas
              kesehatan di seluruh Indonesia.
            </h1>
            {vision && (
              <p
                className="rise mt-6 max-w-[52ch] leading-relaxed text-ink-foreground/70"
                style={{ animationDelay: "120ms" }}
              >
                {vision}
              </p>
            )}
            <div
              className="rise mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "180ms" }}
            >
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

          <figure className="rise relative" style={{ animationDelay: "240ms" }}>
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl">
              <Image
                src="/warehouse.jpg"
                alt="Gudang penyimpanan PT. Antar Mitra Persada"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            {/* Chip stat mengambang — elemen tanda halaman ini. */}
            {floatingMetric && (
              <figcaption className="absolute -bottom-5 left-6 rounded-2xl bg-background px-5 py-3.5 shadow-md">
                <p className="text-2xl font-extrabold tracking-tight text-primary">
                  {floatingMetric.value}
                </p>
                <p className="text-xs font-semibold text-muted-foreground">
                  {floatingMetric.label} dilayani
                </p>
              </figcaption>
            )}
          </figure>
        </div>
      </section>

      {/* Kartu angka menumpang tepi bawah hero — bukti sebelum narasi. */}
      {metrics.length > 0 && (
        <div className="mx-auto -mt-20 max-w-6xl px-6">
          <dl className="grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <dd className="text-4xl font-extrabold tracking-tight text-primary">
                  {metric.value}
                </dd>
                <dt className="mt-2 font-semibold">{metric.label}</dt>
                {metric.note && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {metric.note}
                  </p>
                )}
              </div>
            ))}
          </dl>
          {metricsAsOf && (
            <p className="mt-4 text-xs text-muted-foreground">
              Data {metricsAsOf}
            </p>
          )}
        </div>
      )}

      {/* Tentang: prosa mengklaim "berskala nasional", kolom di sebelahnya
          membuktikannya dengan daftar wilayah. */}
      <section className={`${FULL_SCREEN} flex`}>
        <div className="mx-auto my-auto grid w-full max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Chip>Tentang Kami</Chip>
            {/* Paragraf utuh, bukan headline — ukurannya mengikuti itu. */}
            <h2 className="mt-4 max-w-[30ch] text-2xl leading-snug font-extrabold tracking-tight text-balance sm:text-3xl">
              {lead}
            </h2>
            {second && (
              <p className="mt-6 max-w-[56ch] leading-relaxed text-muted-foreground">
                {second}
              </p>
            )}
            <Link
              href="/about"
              className="mt-8 inline-block rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Profil Selengkapnya
            </Link>
          </div>

          {coverage.length > 0 && (
            <div className="rounded-3xl bg-muted p-8">
              <p className="font-semibold">Jangkauan wilayah</p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {coverage.map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-background px-4 py-2 text-sm font-medium shadow-sm"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
