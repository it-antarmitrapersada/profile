import Image from "next/image";
import Link from "next/link";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Eyebrow } from "@/components/section";

export default async function HomePage() {
  const { vision, metrics, metricsAsOf, catalogUrl } = await getProfile();

  return (
    <>
      {/* Hero adalah tesis: kalimat paling khas yang perusahaan punya tentang
          dirinya sendiri — visinya — dipasang sebagai pernyataan, bukan sebagai
          subjudul di bawah foto stok. */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-32 sm:pb-20">
        <Eyebrow className="rise">Visi</Eyebrow>
        <h1
          className="rise mt-6 max-w-[34ch] font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.02em] text-balance"
          style={{ animationDelay: "60ms" }}
        >
          {vision || "Distribusi obat dan alat kesehatan berskala nasional."}
        </h1>
        {/* Katalog adalah aksi paling berharga di halaman ini: jalan langsung
            dari "perusahaan ini meyakinkan" ke "saya bisa belanja sekarang".
            Diberi bobot visual paling besar; sisanya dibiarkan tenang. */}
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
      </section>

      {/* Bukti sebelum narasi: untuk pejabat pengadaan, angka instansi terlayani
          lebih meyakinkan daripada kalimat apa pun tentang perusahaan. */}
      {metrics.length > 0 && (
        <section className="border-y bg-muted">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <dl className="grid gap-10 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <dd className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-none font-bold tracking-[-0.03em] text-primary">
                    {metric.value}
                  </dd>
                  <dt className="mt-3 font-display text-sm font-semibold tracking-tight">
                    {metric.label}
                  </dt>
                  {metric.note && (
                    <p className="mt-1 font-body text-sm leading-snug text-muted-foreground">
                      {metric.note}
                    </p>
                  )}
                </div>
              ))}
            </dl>
            {metricsAsOf && (
              /* Menyebut tanggalnya menaikkan kepercayaan, bukan menurunkan —
                 angka tanpa keterangan waktu tidak bisa diperiksa siapa pun. */
              <Eyebrow className="mt-10 border-t pt-4">
                Data {metricsAsOf}
              </Eyebrow>
            )}
          </div>
        </section>
      )}

      {/* Foto sebagai bukti, bukan pembuka — diberi keterangan seperti lampiran. */}
      <figure className="pb-20">
        <div className="relative aspect-21/9 w-full">
          <Image
            src="/warehouse.jpg"
            alt="Gudang penyimpanan PT. Antar Mitra Persada"
            fill
            priority
            sizes="100vw"
            className="object-cover saturate-[0.85]"
          />
        </div>
        <figcaption className="mx-auto max-w-5xl px-6 pt-3">
          <Eyebrow>Gudang penyimpanan</Eyebrow>
        </figcaption>
      </figure>
    </>
  );
}
