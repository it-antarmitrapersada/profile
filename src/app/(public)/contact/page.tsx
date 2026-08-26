import type { Metadata } from "next";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Eyebrow, RecordRow } from "@/components/section";

export const metadata: Metadata = {
  title: "Kontak | PT. Antar Mitra Persada",
  description: "Alamat, telepon, dan surel PT. Antar Mitra Persada.",
};

export default async function ContactPage() {
  const { address, phone, email, mapsEmbedUrl } = await getProfile();

  const rows = [
    { label: "Alamat", value: address, href: undefined },
    { label: "Telepon", value: phone, href: `tel:${phone}` },
    { label: "Surel", value: email, href: `mailto:${email}` },
  ].filter((row) => row.value);

  return (
    <div className="mx-auto max-w-5xl px-6 pt-20 pb-24 sm:pt-28">
      <Eyebrow>Hubungi Kami</Eyebrow>
      <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.03em]">
        Kontak
      </h1>

      {rows.length > 0 ? (
        <div className="mt-12 border-t">
          {rows.map((row) => (
            <RecordRow key={row.label} label={row.label}>
              {row.href ? (
                <a
                  href={row.href}
                  className="underline-offset-4 hover:underline"
                >
                  {row.value}
                </a>
              ) : (
                row.value
              )}
            </RecordRow>
          ))}
        </div>
      ) : (
        <p className="mt-12 max-w-[52ch] font-body text-lg leading-[1.7] text-muted-foreground">
          Informasi kontak belum tersedia.
        </p>
      )}

      {mapsEmbedUrl && (
        <figure className="mt-12">
          <iframe
            src={mapsEmbedUrl}
            title="Peta lokasi kantor"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-video w-full border"
          />
          <figcaption className="pt-3">
            <Eyebrow>Lokasi kantor</Eyebrow>
          </figcaption>
        </figure>
      )}
    </div>
  );
}
