import type { Metadata } from "next";
import Image from "next/image";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { listOpenJobs } from "@/modules/careers/careers.service";
import { flyerUrl, formatDate } from "@/modules/careers/careers.dto";
import {
  Eyebrow,
  HeroAction,
  PageHero,
  PrimaryLink,
  ValueGrid,
} from "@/components/section";

export const metadata: Metadata = {
  alternates: { canonical: "/careers" },
  title: "Karir",
  description: "Bekerja bersama PT. Antar Mitra Persada di Sukoharjo.",
};

export default async function CareersPage() {
  const [{ coreValues, careersFormUrl }, jobs] = await Promise.all([
    getProfile(),
    listOpenJobs(),
  ]);

  return (
    <>
      <PageHero eyebrow="Karir" title="Bekerja bersama kami di Sukoharjo.">
        <HeroAction text="Lamaran untuk seluruh posisi diterima melalui formulir daring. Tim kami akan menghubungi kandidat yang sesuai.">
          {careersFormUrl && (
            <PrimaryLink href={careersFormUrl}>Isi formulir lamaran ↗</PrimaryLink>
          )}
        </HeroAction>
      </PageHero>

      {jobs.length > 0 && (
        <section className="wrap pb-[clamp(64px,9vw,112px)]">
          <Eyebrow className="mb-2">Lowongan dibuka</Eyebrow>
          <ul className="border-t border-foreground">
            {jobs.map((job) => {
              const applyUrl = job.applyUrl || careersFormUrl;
              const points = job.description
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean);
              return (
                <li
                  key={job.id}
                  className="flex flex-wrap items-start justify-between gap-x-12 gap-y-5 border-b py-7"
                >
                  {job.flyer && (
                    <a
                      href={flyerUrl(job.flyer)}
                      target="_blank"
                      rel="noopener"
                      className="w-full sm:w-48"
                    >
                      <Image
                        src={flyerUrl(job.flyer)}
                        alt={`Flyer lowongan ${job.title}`}
                        width={384}
                        height={480}
                        sizes="(min-width: 640px) 192px, 100vw"
                        className="h-auto w-full rounded-lg border"
                      />
                    </a>
                  )}
                  <div className="flex max-w-[720px] flex-col gap-1.5">
                    <h2 className="text-2xl font-medium tracking-[-0.01em]">
                      {job.title}
                    </h2>
                    <p className="text-[15px] text-muted-foreground">
                      {[job.location, job.type].filter(Boolean).join(" · ")}
                      {job.deadline &&
                        ` — batas lamaran ${formatDate(job.deadline)}`}
                    </p>
                    {points.length > 0 && (
                      <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed text-body">
                        {points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {applyUrl && (
                    <PrimaryLink href={applyUrl}>Lamar ↗</PrimaryLink>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {coreValues.length > 0 && (
        <section className="wrap pb-[clamp(80px,11vw,140px)]">
          <Eyebrow className="mb-8 border-t border-foreground pt-10">
            Nilai yang kami pegang
          </Eyebrow>
          <ValueGrid values={coreValues} compact />
        </section>
      )}
    </>
  );
}
