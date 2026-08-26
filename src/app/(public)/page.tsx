import Image from "next/image";
import Link from "next/link";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Chip } from "@/components/section";
import { telHref } from "@/lib/utils";

// Tinggi header sticky, dipotong dari tinggi layar supaya hero mengisi
// satu layar penuh tanpa terdorong keluar.
// Header mobile dua baris (~6.5rem), desktop satu baris (4.25rem) — nilai
// potong ikut breakpoint supaya hero benar-benar pas satu layar di keduanya.
const FULL_SCREEN =
  "min-h-[calc(100svh-6.5rem)] sm:min-h-[calc(100svh-4.25rem)]";

export default async function HomePage() {
  const {
    about,
    metrics,
    coverage,
    advantageTitle,
    advantageBody,
    catalogUrl,
    phone,
    pbfLicenseNo,
    cdobCertNo,
    businessIdNo,
    totalCustomers,
  } = await getProfile();

  const credentials = [
    { label: "Izin PBF", value: pbfLicenseNo },
    { label: "Sertifikat CDOB", value: cdobCertNo },
    { label: "NIB", value: businessIdNo },
  ].filter((item) => item.value);

  // Heading berhenti di kalimat pertama — paragraf bukan headline, dan
  // about tanpa baris kosong pun tidak akan jadi dinding extrabold.
  const [lead = "", ...restParas] = about.split(/\n\s*\n/);
  const sentenceBreak = lead.match(/^(.+?[.!?])\s+([\s\S]+)$/);
  const aboutHeading = sentenceBreak ? sentenceBreak[1] : lead;
  const aboutBody = [sentenceBreak?.[2], restParas[0]]
    .filter(Boolean)
    .join("\n\n");
  const [advantageLead] = advantageBody.split(/\n\s*\n/);

  return (
    <>
      {/* Hero panel ink. Headline dan subteks hardcode dan faktual —
          subteks adalah klaim satu pintu yang bisa diperiksa lewat tombol
          tepat di bawahnya. Visi perusahaan tampil utuh di /about. */}
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
            <p
              className="rise mt-6 max-w-[52ch] leading-relaxed text-ink-foreground/70"
              style={{ animationDelay: "120ms" }}
            >
              Satu penyedia untuk obat, BMHP, dan alat kesehatan dari semua
              merek dan prinsipal — melalui e-Katalog INAPROC.
            </p>
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
            {/* Angka manual dari admin, bukan turunan data lain — dikontrol
                langsung supaya bisa mengikuti angka pemasaran yang berlaku. */}
            {totalCustomers && (
              <div className="absolute -bottom-5 left-6 rounded-2xl bg-background px-5 py-3.5 shadow-md">
                <p className="text-2xl font-extrabold tracking-tight text-primary">
                  {totalCustomers}
                </p>
                <p className="text-xs font-semibold text-muted-foreground">
                  Total Pelanggan
                </p>
              </div>
            )}
          </figure>
        </div>
      </section>

      {/* Kartu angka menumpang tepi bawah hero — bukti sebelum narasi.
          Tanggal menempel rapat ke angka: ikatan klaim-tanggal itu wajib. */}
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
          {/* Item checklist kualifikasi penyedia — di titik yang sama
              dengan bukti angka, sebelum pembaca lanjut ke narasi. */}
          {credentials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t pt-6 text-sm">
              {credentials.map((item) => (
                <p key={item.label} className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {item.label}
                  </span>{" "}
                  {item.value}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pembeda yang bisa diperiksa, diucapkan di halaman yang pasti dibaca
          semua orang — lalu langsung diberi cara memeriksanya. */}
      {advantageTitle && (
        <section className="mt-20 bg-muted">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="max-w-[22ch] text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
                {advantageTitle}
              </h2>
              {advantageLead && (
                <p className="mt-5 max-w-[58ch] leading-relaxed text-muted-foreground">
                  {advantageLead}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3">
              {catalogUrl && (
                <a
                  href={catalogUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Periksa di Katalog INAPROC ↗
                </a>
              )}
              <Link
                href="/services"
                className="px-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Selengkapnya tentang layanan
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Tentang: prosa mengklaim "berskala nasional", kolom di sebelahnya
          membuktikannya dengan daftar wilayah. */}
      <section className="py-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Chip>Tentang Kami</Chip>
            {/* Paragraf utuh, bukan headline — ukurannya mengikuti itu. */}
            <h2 className="mt-4 max-w-[30ch] text-2xl leading-snug font-extrabold tracking-tight text-balance sm:text-3xl">
              {aboutHeading}
            </h2>
            {aboutBody && (
              <p className="mt-6 max-w-[56ch] leading-relaxed whitespace-pre-line text-muted-foreground">
                {aboutBody}
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

      {/* Penutup: panel ber-radius di atas latar putih — jahitan tegas
          sebelum footer supaya momen bertindak punya panggungnya sendiri.
          Email sengaja tidak di sini: telepon kantor adalah sinyal
          legitimasi, dan email tetap tersedia di footer dan /contact. */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-3xl bg-ink px-8 py-12 text-ink-foreground sm:px-12">
          <div>
            <h2 className="max-w-[22ch] text-2xl font-extrabold tracking-tight text-balance sm:text-3xl">
              {catalogUrl
                ? "Mulai dari katalog, atau hubungi kami langsung."
                : "Hubungi kami untuk memulai pengadaan Anda."}
            </h2>
            {phone && (
              <p className="mt-3 text-sm text-ink-foreground/70">
                <a
                  href={telHref(phone)}
                  className="font-semibold text-ink-foreground underline-offset-4 hover:underline"
                >
                  {phone}
                </a>
              </p>
            )}
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
    </>
  );
}
