import type { Metadata } from "next";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { CtaBand, H2, PageHero, paragraphs } from "@/components/section";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Pengadaan obat, BMHP, dan alat kesehatan melalui LPSE dan e-Katalog INAPROC dengan sistem satu pintu.",
};

const PRODUCTS = ["Obat-obatan", "BMHP", "Alat Kesehatan"];

export default async function ServicesPage() {
  const { advantageTitle, advantageBody, metrics, catalogUrl, phone } =
    await getProfile();
  const [lead, ...rest] = paragraphs(advantageBody);

  return (
    <>
      <PageHero
        eyebrow="Layanan pengadaan"
        title={advantageTitle || "Sistem satu pintu"}
      >
        {lead && (
          <p className="max-w-[720px] text-xl leading-[1.6] text-pretty text-body">
            {lead}
          </p>
        )}
      </PageHero>

      <div className="wrap">
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] border-t border-foreground">
          {PRODUCTS.map((name, index) => (
            <li
              key={name}
              className="flex flex-col gap-2.5 border-b pt-7 pr-8 pb-10"
            >
              <span className="font-mono text-[13px] text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl font-medium tracking-[-0.01em]">
                {name}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {rest.length > 0 && (
        <section className="wrap split py-[clamp(72px,10vw,128px)]">
          <H2 className="text-[clamp(28px,3vw,36px)] leading-[1.15]">
            Satu penyedia untuk semua merek dan prinsipal
          </H2>
          <div className="flex flex-col gap-6 text-lg leading-[1.65] text-body">
            {rest.map((para) => (
              <p key={para} className="text-pretty">
                {para}
              </p>
            ))}
          </div>
        </section>
      )}

      {metrics.length > 0 && (
        <section className="mb-[clamp(80px,10vw,120px)] bg-muted">
          <div className="wrap split py-[clamp(56px,8vw,96px)]">
            <H2 className="text-[clamp(28px,3vw,36px)] leading-[1.15]">
              Melayani
            </H2>
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-8">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex flex-col gap-1.5">
                  <dt className="text-[15px] font-medium">{metric.label}</dt>
                  <dd className="order-first text-4xl font-medium tracking-[-0.02em]">
                    {metric.value}
                  </dd>
                  {metric.note && (
                    <dd className="text-sm leading-normal text-muted-foreground">
                      {metric.note}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <CtaBand catalogUrl={catalogUrl} phone={phone} />
    </>
  );
}
