import Image from "next/image";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import {
  CtaBand,
  Eyebrow,
  H2,
  HeroAction,
  PageHero,
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
          satu pintu yang bisa diperiksa lewat tombol tepat di sebelahnya. */}
      <PageHero
        eyebrow="Pedagang Besar Farmasi & Distributor Alat Kesehatan"
        title="Obat, BMHP, dan alat kesehatan untuk fasilitas kesehatan di seluruh Indonesia."
        className="gap-9 pb-[clamp(48px,6vw,80px)]"
      >
        <HeroAction text="Satu penyedia untuk semua merek dan prinsipal, tersedia di e-Katalog INAPROC.">
          {catalogUrl && (
            <PrimaryLink href={catalogUrl}>Buka Katalog INAPROC ↗</PrimaryLink>
          )}
        </HeroAction>
      </PageHero>

      <div className="wrap">
        <div className="relative h-[clamp(260px,40vw,520px)]">
          <Image
            src="/warehouse.jpg"
            alt="Gudang PT. Antar Mitra Persada"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1120px"
            className="rounded-[4px] object-cover"
          />
        </div>
      </div>

      {stats.length > 0 && (
        <dl className="wrap grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-12 gap-y-10 py-[clamp(56px,8vw,96px)]">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2">
              <dt className="text-[15px] text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="text-[clamp(40px,4.4vw,52px)] font-medium tracking-[-0.03em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* Titik pemeriksaan pertama pejabat pengadaan, tepat setelah angka. */}
      {credentials.length > 0 && (
        <div className="wrap">
          <dl className="flex flex-wrap gap-x-14 gap-y-5 border-y py-7 text-sm">
            {credentials.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="text-faint">{item.label}</dt>
                <dd className="font-mono">{item.value}</dd>
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
          <div className="relative min-h-[360px] max-h-[600px]">
            <Image
              src="/graha-berseri.jpg"
              alt="Graha Berseri, Sukoharjo"
              fill
              sizes="(max-width: 840px) 100vw, 50vw"
              className="object-cover"
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
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-x-10">
            {coverage.map((area) => (
              <li key={area} className="border-b py-4 text-lg">
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
