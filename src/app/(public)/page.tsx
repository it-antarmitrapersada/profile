import Image from "next/image";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import {
  CtaBand,
  Eyebrow,
  H2,
  PrimaryLink,
  TextLink,
  paragraphs,
} from "@/components/section";

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

  // Angka manual dari admin, bukan hasil hitung — tampil paling depan.
  const stats = [
    ...(totalCustomers
      ? [{ label: "Total pelanggan", value: totalCustomers }]
      : []),
    ...metrics,
  ];

  const credentials = [
    { label: "Izin PBF", value: pbfLicenseNo },
    { label: "Sertifikat CDOB", value: cdobCertNo },
    { label: "NIB", value: businessIdNo },
  ].filter((item) => item.value);

  const [aboutLead, aboutGroup] = paragraphs(about);
  const [advantageLead] = paragraphs(advantageBody);

  return (
    <>
      {/* Headline dan subteks hardcode dan faktual — subteks adalah klaim
          satu pintu yang bisa diperiksa lewat tombol tepat di sebelahnya.
          Tinggi = viewport dikurangi header sticky (75px). */}
      <section className="relative flex min-h-[calc(100svh-75px)] flex-col justify-end bg-[#0e2a22] text-white">
        {/* ponytail: sementara Graha Berseri; ganti foto gudang/armada horizontal tanpa tulisan bila tersedia. */}
        <Image
          src="/graha-berseri-2.jpg"
          alt="Graha Berseri, kantor PT. Antar Mitra Persada di Sukoharjo"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,26,20,0.25)_0%,rgba(8,26,20,0.7)_35%,rgba(8,26,20,0.92)_100%)]" />
        <div className="wrap relative flex w-full flex-col gap-[clamp(16px,2.6vh,28px)] pt-[clamp(72px,22vh,280px)] pb-[clamp(20px,4vh,48px)]">
          <p className="rise text-sm font-medium text-[#e3f1ea]">
            Pedagang Besar Farmasi & Distributor Alat Kesehatan
          </p>
          <h1
            className="rise max-w-[860px] text-[clamp(34px,min(4.6vw,7vh),60px)] leading-[1.06] font-medium tracking-[-0.03em] text-balance"
            style={{ animationDelay: "60ms" }}
          >
            Obat, BMHP, dan alat kesehatan untuk fasilitas kesehatan di seluruh
            Indonesia.
          </h1>
          <div
            className="rise flex flex-wrap items-end justify-between gap-x-12 gap-y-6"
            style={{ animationDelay: "120ms" }}
          >
            <p className="max-w-[480px] text-lg leading-[1.55] text-[#e1ece7]">
              Satu penyedia untuk semua merek dan prinsipal, tersedia di
              e-Katalog INAPROC.
            </p>
            {catalogUrl && (
              <PrimaryLink
                href={catalogUrl}
                className="bg-white px-6 py-[15px] whitespace-nowrap text-[#0e2a22] hover:bg-[#e3efe9]"
              >
                Buka Katalog INAPROC ↗
              </PrimaryLink>
            )}
          </div>
          {stats.length > 0 && (
            <dl className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(min(100%,120px),1fr))] gap-5 border-t border-white/22 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1">
                  <dt className="text-[13.5px] text-[#cfe0d8]">{stat.label}</dt>
                  <dd className="text-[clamp(26px,2.4vw,32px)] font-medium tracking-[-0.02em]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* Titik pemeriksaan pertama pejabat pengadaan, tepat setelah hero. */}
      {credentials.length > 0 && (
        <div className="wrap">
          <dl className="flex flex-wrap gap-x-14 gap-y-5 border-b py-7 text-sm">
            {credentials.map((item) => (
              <div key={item.label} className="flex min-w-0 flex-col gap-1">
                <dt className="text-faint">{item.label}</dt>
                <dd className="font-mono wrap-anywhere">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {advantageTitle && (
        <section className="wrap split py-[clamp(80px,11vw,140px)]">
          <H2>{advantageTitle}</H2>
          <div className="flex flex-col gap-8">
            {advantageLead && (
              <p className="text-xl leading-[1.6] text-pretty text-body">
                {advantageLead}
              </p>
            )}
            <TextLink href="/services">Lihat layanan</TextLink>
          </div>
        </section>
      )}

      {aboutLead && (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] bg-muted">
          <div className="relative aspect-4/3 max-h-[600px] min-h-[260px] w-full">
            <Image
              src="/tim-midyear-2025.webp"
              alt="Tim PT. Antar Mitra Persada"
              fill
              sizes="(max-width: 840px) 100vw, 50vw"
              className="object-cover object-[center_80%]"
            />
          </div>
          <div className="flex max-w-[640px] flex-col justify-center gap-6 p-[clamp(40px,7vw,80px)]">
            <Eyebrow>Tentang kami</Eyebrow>
            <p className="text-[clamp(22px,2.2vw,26px)] leading-[1.4] tracking-[-0.01em] text-pretty">
              {aboutLead}
            </p>
            {aboutGroup && (
              <p className="leading-[1.6] text-muted-foreground">
                {aboutGroup}
              </p>
            )}
            <TextLink href="/about">Profil perusahaan</TextLink>
          </div>
        </section>
      )}

      {coverage.length > 0 && (
        <section className="wrap split py-[clamp(80px,11vw,140px)]">
          <H2>Jangkauan wilayah</H2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))] gap-x-6">
            {coverage.map((area) => (
              <li key={area} className="border-b py-3.5 text-[clamp(16px,1.6vw,18px)]">
                {area}
              </li>
            ))}
          </ul>
        </section>
      )}

      <CtaBand catalogUrl={catalogUrl} phone={phone} />
    </>
  );
}
