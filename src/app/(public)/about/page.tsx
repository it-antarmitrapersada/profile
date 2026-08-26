import type { Metadata } from "next";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Eyebrow, SectionHeading } from "@/components/section";

export const metadata: Metadata = {
  title: "Tentang Kami | PT. Antar Mitra Persada",
  description:
    "Profil, visi, misi, dan nilai perusahaan PT. Antar Mitra Persada.",
};

export default async function AboutPage() {
  const {
    about,
    vision,
    mission,
    coreValues,
    founderName,
    founderRole,
    founderNote,
  } = await getProfile();

  return (
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pt-28">
      <Eyebrow>Profil Perusahaan</Eyebrow>
      <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.03em]">
        Tentang Kami
      </h1>

      {about && (
        <p className="mt-10 max-w-[62ch] font-body text-lg leading-[1.7] whitespace-pre-line">
          {about}
        </p>
      )}

      {founderName && (
        <section className="mt-20">
          <SectionHeading eyebrow="Owner">{founderName}</SectionHeading>
          {founderRole && <Eyebrow className="mt-4">{founderRole}</Eyebrow>}
          {founderNote && (
            <p className="mt-6 max-w-[58ch] font-body leading-[1.7] whitespace-pre-line text-muted-foreground">
              {founderNote}
            </p>
          )}
        </section>
      )}

      {vision && (
        <section className="mt-20">
          <SectionHeading eyebrow="Visi">Arah yang kami tuju</SectionHeading>
          <p className="mt-8 max-w-[52ch] font-display text-2xl leading-[1.3] font-medium tracking-[-0.02em] text-balance sm:text-3xl">
            {vision}
          </p>
        </section>
      )}

      {mission.length > 0 && (
        <section className="mt-20">
          <SectionHeading eyebrow="Misi">Cara kami menempuhnya</SectionHeading>
          {/* Misi bernomor karena urutannya memang bermakna. Satu baris berarti
              satu paragraf utuh — tidak ada nomor untuk daftar berisi satu. */}
          {mission.length === 1 ? (
            <p className="mt-8 max-w-[62ch] font-body text-lg leading-[1.7] whitespace-pre-line">
              {mission[0]}
            </p>
          ) : (
            <ol className="mt-4">
              {mission.map((point, index) => (
                <li
                  key={index}
                  className="grid gap-2 border-b py-5 sm:grid-cols-[9rem_1fr] sm:gap-8"
                >
                  <Eyebrow className="sm:pt-1.5">
                    {String(index + 1).padStart(2, "0")}
                  </Eyebrow>
                  <p className="max-w-[58ch] font-body text-base leading-[1.7]">
                    {point}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {coreValues.length > 0 && (
        <section className="mt-20">
          <SectionHeading eyebrow="Nilai">Yang kami pegang</SectionHeading>
          {/* Huruf awal tiap nilai membentuk akronim perusahaan, jadi urutan di
              sini mengabarkan sesuatu. Katanya tidak ditulis di mana pun —
              pembaca menemukannya sendiri dari kolom huruf. */}
          <ul className="mt-4">
            {coreValues.map((value) => (
              <li
                key={value.name}
                className="grid gap-1 border-b py-6 sm:grid-cols-[4.5rem_1fr] sm:gap-8"
              >
                <p
                  aria-hidden
                  className="font-display text-3xl leading-none font-bold tracking-[-0.03em] text-primary sm:text-4xl"
                >
                  {value.name.charAt(0).toUpperCase()}
                </p>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {value.name}
                  </h3>
                  <p className="mt-2 max-w-[58ch] font-body leading-[1.7] text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
