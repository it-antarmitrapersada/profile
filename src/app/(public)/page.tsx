import Image from "next/image";
import Link from "next/link";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Eyebrow } from "@/components/section";

// Tinggi header sticky, dipotong dari tinggi layar supaya satu bagian benar-
// benar mengisi satu layar dan tidak terdorong keluar.
const FULL_SCREEN = "min-h-[calc(100svh-4.5rem)]";

export default async function HomePage() {
  const { vision, about, metrics, metricsAsOf, coverage, catalogUrl } =
    await getProfile();

  // Dipotong di batas paragraf, bukan di hitungan karakter: penulisnya sudah
  // menentukan di mana satu gagasan selesai.
  const [lead, second] = about.split(/\n\s*\n/);

  return (
    <>
      {/* LAYAR 1 — Tesis dan buktinya dalam satu tarikan napas: siapa kami
          (visi), seberapa jauh sudah dipercaya (angka), dan pintu masuknya
          (katalog). Pejabat pengadaan tidak perlu menggulir untuk memutuskan. */}
      <section
        className={`mx-auto flex max-w-5xl flex-col px-6 ${FULL_SCREEN} lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-14`}
      >
        <div className="flex flex-col justify-center py-14 lg:py-20">
          <Eyebrow className="rise">Visi</Eyebrow>
          <h1
            className="rise mt-6 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.02em] text-balance"
            style={{ animationDelay: "60ms" }}
          >
            {vision}
          </h1>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t pt-8"
            style={{ animationDelay: "120ms" }}
          >
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
              href="/services"
              className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase underline-offset-8 hover:text-foreground hover:underline"
            >
              Layanan Pengadaan →
            </Link>
          </div>

          {metrics.length > 0 && (
            <dl
              className="rise mt-12 grid grid-cols-3 gap-x-6 gap-y-2 border-t pt-8"
              style={{ animationDelay: "180ms" }}
            >
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <dd className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-none font-bold tracking-[-0.03em] text-primary">
                    {metric.value}
                  </dd>
                  <dt className="mt-2 font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground uppercase">
                    {metric.label}
                  </dt>
                </div>
              ))}
              {metricsAsOf && (
                <p className="col-span-3 mt-4 font-mono text-[0.625rem] tracking-[0.14em] text-muted-foreground/80 uppercase">
                  Data {metricsAsOf}
                </p>
              )}
            </dl>
          )}
        </div>

        {/* Foto membocor ke tepi kanan layar sementara rel kiri tetap lurus —
            satu-satunya elemen yang keluar dari kolom di seluruh situs. */}
        <figure className="relative -mx-6 min-h-[38svh] lg:mx-0 lg:min-h-0 lg:mr-[calc(32rem-50vw)]">
          <Image
            src="/warehouse.jpg"
            alt="Gudang penyimpanan PT. Antar Mitra Persada"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover saturate-[0.85]"
          />
        </figure>
      </section>

      {/* LAYAR 2 — Prosa mengklaim "berskala nasional"; kolom di sebelahnya
          adalah daftar wilayah yang membuktikannya. Bukan peta hiasan. */}
      <section
        id="tentang"
        className={`border-t bg-muted ${FULL_SCREEN} flex scroll-mt-20`}
      >
        <div className="mx-auto my-auto grid w-full max-w-5xl items-start gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="flex flex-col">
            <Eyebrow>Tentang Kami</Eyebrow>
            {/* Kalimat pembuka perusahaan sendiri yang jadi pernyataan — judul
                karangan di sini hanya akan mengulang isi paragraf di bawahnya. */}
            {lead && (
              <p className="mt-6 max-w-[24ch] font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.2] font-bold tracking-[-0.02em] text-balance">
                {lead}
              </p>
            )}
            {second && (
              <p className="mt-8 max-w-[54ch] font-body text-lg leading-[1.7]">
                {second}
              </p>
            )}
            <Link
              href="/about"
              className="mt-10 self-start font-mono text-[0.6875rem] tracking-[0.14em] text-primary uppercase underline-offset-8 hover:underline"
            >
              Profil Selengkapnya →
            </Link>
          </div>

          {coverage.length > 0 && (
            <div>
              <Eyebrow className="border-b pb-4">Jangkauan</Eyebrow>
              <ul>
                {coverage.map((area) => (
                  <li
                    key={area}
                    className="border-b py-3 font-display text-base font-semibold tracking-tight sm:text-lg"
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
