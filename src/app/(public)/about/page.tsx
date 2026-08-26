import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { ValueIcon } from "@/modules/company-profile/components/value-icon";

export const metadata: Metadata = {
  title: "Tentang Kami | PT. Antar Mitra Persada",
  description:
    "Profil, visi, misi, dan nilai perusahaan PT. Antar Mitra Persada.",
};

export default async function AboutPage() {
  const { about, vision, mission, coreValues } = await getProfile();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Tentang Kami</h1>

      {about && (
        <p className="mt-6 max-w-3xl text-pretty whitespace-pre-line text-muted-foreground">
          {about}
        </p>
      )}

      {vision && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Visi</h2>
          <p className="mt-3 max-w-3xl text-pretty whitespace-pre-line text-muted-foreground">
            {vision}
          </p>
        </section>
      )}

      {mission.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Misi</h2>
          {mission.length === 1 ? (
            <p className="mt-3 max-w-3xl text-pretty whitespace-pre-line text-muted-foreground">
              {mission[0]}
            </p>
          ) : (
            <ol className="mt-3 max-w-3xl list-decimal space-y-2 pl-5 text-muted-foreground">
              {mission.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ol>
          )}
        </section>
      )}

      {coreValues.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Nilai Perusahaan</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value) => (
              <Card key={value.name}>
                <CardContent className="pt-6">
                  <ValueIcon name={value.icon} className="size-6 text-primary" />
                  <h3 className="mt-3 font-semibold">{value.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
