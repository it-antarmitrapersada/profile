import type { Metadata } from "next";
import Image from "next/image";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import {
  CtaBand,
  Eyebrow,
  H2,
  ValueGrid,
  paragraphs,
} from "@/components/section";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Profil, visi, misi, dan nilai perusahaan PT. Antar Mitra Persada.",
};

const STATEMENT = "text-[22px] leading-[1.45] tracking-[-0.01em] text-pretty";

export default async function AboutPage() {
  const {
    about,
    vision,
    mission,
    coreValues,
    founderName,
    founderRole,
    founderNote,
    catalogUrl,
    phone,
  } = await getProfile();
  const [lead, ...rest] = paragraphs(about);

  return (
    <>
      {/* H1 sengaja lebih kecil dari halaman lain: isinya kalimat profil
          utuh, bukan judul. */}
      <section className="wrap flex flex-col gap-7 pt-[clamp(64px,10vw,120px)] pb-[clamp(56px,7vw,88px)]">
        <Eyebrow className="rise">Profil perusahaan</Eyebrow>
        <h1
          className="rise max-w-[1000px] text-[clamp(32px,4.2vw,52px)] leading-[1.12] font-medium tracking-[-0.025em] text-pretty"
          style={{ animationDelay: "60ms" }}
        >
          {lead || "Tentang Kami"}
        </h1>
      </section>

      <div className="wrap">
        <div className="relative h-[clamp(260px,40vw,520px)]">
          <Image
            src="/graha-berseri.jpg"
            alt="Graha Berseri, Sukoharjo"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1120px"
            className="rounded-[4px] object-cover object-[center_40%]"
          />
        </div>
      </div>

      {rest.length > 0 && (
        <div className="wrap split gap-y-6 py-[clamp(72px,10vw,120px)] text-lg leading-[1.65] text-body">
          {rest.map((para) => (
            <p key={para} className="text-pretty">
              {para}
            </p>
          ))}
        </div>
      )}

      {(vision || mission.length > 0) && (
        <div className="wrap">
          <div className="split gap-y-10 border-t border-foreground pt-10">
            {vision && (
              <section className="flex flex-col gap-3.5">
                <Eyebrow>Visi</Eyebrow>
                <p className={STATEMENT}>{vision}</p>
              </section>
            )}
            {mission.length > 0 && (
              <section className="flex flex-col gap-3.5">
                <Eyebrow>Misi</Eyebrow>
                {mission.map((point) => (
                  <p key={point} className={STATEMENT}>
                    {point}
                  </p>
                ))}
              </section>
            )}
          </div>
        </div>
      )}

      {coreValues.length > 0 && (
        <section className="wrap py-[clamp(80px,11vw,140px)]">
          <div className="mb-10 flex flex-col gap-3.5">
            <Eyebrow>Nilai perusahaan</Eyebrow>
            <H2>
              {coreValues.map((value) => value.name.charAt(0)).join("")}
            </H2>
          </div>
          <ValueGrid values={coreValues} />
        </section>
      )}

      {founderName && (
        <section className="mb-[clamp(80px,10vw,120px)] bg-muted">
          <div className="wrap split py-[clamp(56px,8vw,96px)]">
            <div className="flex flex-col gap-1.5">
              <Eyebrow>Pendiri</Eyebrow>
              <h2 className="mt-2 text-[clamp(26px,2.6vw,32px)] font-medium tracking-[-0.015em]">
                {founderName}
              </h2>
              {founderRole && (
                <p className="text-[15px] text-muted-foreground">
                  {founderRole}
                </p>
              )}
            </div>
            {founderNote && (
              <p className="text-lg leading-[1.65] whitespace-pre-line text-pretty text-body">
                {founderNote}
              </p>
            )}
          </div>
        </section>
      )}

      <CtaBand catalogUrl={catalogUrl} phone={phone} />
    </>
  );
}
