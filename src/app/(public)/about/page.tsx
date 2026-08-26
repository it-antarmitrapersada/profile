import type { Metadata } from "next";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Chip, SectionHeading } from "@/components/section";

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

  const initials = founderName
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Chip>Profil Perusahaan</Chip>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Tentang Kami
      </h1>

      {about && (
        <p className="mt-8 max-w-3xl leading-relaxed whitespace-pre-line text-muted-foreground">
          {about}
        </p>
      )}

      {founderName && (
        <section className="mt-16 max-w-3xl rounded-3xl bg-muted p-8 sm:p-10">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground"
            >
              {initials}
            </span>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">
                {founderName}
              </h2>
              {founderRole && (
                <p className="text-sm font-medium text-muted-foreground">
                  {founderRole}
                </p>
              )}
            </div>
          </div>
          {founderNote && (
            <p className="mt-6 leading-relaxed whitespace-pre-line text-muted-foreground">
              {founderNote}
            </p>
          )}
        </section>
      )}

      {vision && (
        <section className="mt-16">
          <SectionHeading chip="Visi">Arah yang kami tuju</SectionHeading>
          <p className="mt-6 max-w-[40ch] text-2xl leading-snug font-extrabold tracking-tight text-balance text-primary sm:text-3xl">
            {vision}
          </p>
        </section>
      )}

      {mission.length > 0 && (
        <section className="mt-16">
          <SectionHeading chip="Misi">Cara kami menempuhnya</SectionHeading>
          {/* Misi bernomor hanya kalau memang lebih dari satu poin. */}
          {mission.length === 1 ? (
            <p className="mt-6 max-w-3xl leading-relaxed whitespace-pre-line text-muted-foreground">
              {mission[0]}
            </p>
          ) : (
            <ol className="mt-8 grid max-w-3xl gap-4">
              {mission.map((point, index) => (
                <li
                  key={index}
                  className="flex gap-4 rounded-2xl border bg-background p-5 shadow-sm"
                >
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-extrabold text-primary"
                  >
                    {index + 1}
                  </span>
                  <p className="leading-relaxed">{point}</p>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {coreValues.length > 0 && (
        <section className="mt-16">
          <SectionHeading chip="Nilai">Yang kami pegang</SectionHeading>
          {/* Huruf awal tiap nilai membentuk akronim perusahaan — urutannya
              mengabarkan sesuatu, dan katanya dibiarkan ditemukan pembaca. */}
          {/* Satu baris berlima di layar lebar: huruf-hurufnya mengeja
              akronimnya sendiri. */}
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {coreValues.map((value) => (
              <li
                key={value.name}
                className="rounded-2xl border bg-background p-6 shadow-sm"
              >
                <span
                  aria-hidden
                  className="grid size-12 place-items-center rounded-full bg-accent text-xl font-extrabold text-primary"
                >
                  {value.name.charAt(0).toUpperCase()}
                </span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight">
                  {value.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
