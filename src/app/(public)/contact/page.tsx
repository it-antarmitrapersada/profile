import type { Metadata } from "next";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { telHref } from "@/lib/utils";
import {
  PageHero,
  PrimaryLink,
  SOCIALS,
  WHATSAPP,
} from "@/components/section";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Alamat, telepon, dan surel PT. Antar Mitra Persada.",
};

export default async function ContactPage() {
  const { address, phone, email, mapsEmbedUrl, catalogUrl } =
    await getProfile();

  const rows = [
    { label: "Alamat", value: address, href: undefined },
    { label: "Telepon", value: phone, href: telHref(phone) },
    { label: "WhatsApp", value: WHATSAPP.label, href: WHATSAPP.href },
    { label: "Surel", value: email, href: `mailto:${email}` },
  ].filter((row) => row.value);

  return (
    <>
      <PageHero eyebrow="Hubungi kami" title="Kontak" />

      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-x-20 gap-y-12 pb-[clamp(80px,11vw,140px)]">
        <div>
          {rows.length > 0 ? (
            <dl className="border-t border-foreground">
              {rows.map(({ label, value, href }) => (
                <div key={label} className="flex flex-col gap-2 border-b py-6">
                  <dt className="text-sm text-faint">{label}</dt>
                  <dd className="text-lg leading-normal whitespace-pre-line">
                    {href ? (
                      <a
                        href={href}
                        className="transition-colors hover:text-primary"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
              <div className="flex flex-col gap-2 border-b py-6">
                <dt className="text-sm text-faint">Media sosial</dt>
                <dd className="flex flex-wrap gap-6 text-lg">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener"
                      className="transition-colors hover:text-primary"
                    >
                      {social.label} ↗
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-lg text-muted-foreground">
              Informasi kontak belum tersedia.
            </p>
          )}
          {catalogUrl && (
            <PrimaryLink href={catalogUrl} className="mt-8">
              Buka Katalog INAPROC ↗
            </PrimaryLink>
          )}
        </div>

        {mapsEmbedUrl && (
          <iframe
            src={mapsEmbedUrl}
            title="Peta lokasi kantor"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[440px] w-full rounded-[4px] border-0 bg-muted"
          />
        )}
      </div>
    </>
  );
}
