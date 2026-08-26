import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Chip } from "@/components/section";

export const metadata: Metadata = {
  title: "Kontak | PT. Antar Mitra Persada",
  description: "Alamat, telepon, dan surel PT. Antar Mitra Persada.",
};

export default async function ContactPage() {
  const { address, phone, email, mapsEmbedUrl } = await getProfile();

  const cards = [
    { icon: MapPin, label: "Alamat", value: address, href: undefined },
    { icon: Phone, label: "Telepon", value: phone, href: `tel:${phone}` },
    { icon: Mail, label: "Surel", value: email, href: `mailto:${email}` },
  ].filter((card) => card.value);

  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Chip>Hubungi Kami</Chip>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Kontak
      </h1>

      {cards.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cards.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="rounded-2xl border bg-background p-6 shadow-sm"
            >
              <span
                aria-hidden
                className="grid size-11 place-items-center rounded-full bg-accent text-primary"
              >
                <Icon className="size-5" />
              </span>
              <h2 className="mt-4 font-semibold">{label}</h2>
              <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {href ? (
                  <a
                    href={href}
                    className="underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-10 max-w-[52ch] leading-relaxed text-muted-foreground">
          Informasi kontak belum tersedia.
        </p>
      )}

      {mapsEmbedUrl && (
        <iframe
          src={mapsEmbedUrl}
          title="Peta lokasi kantor"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-10 aspect-video w-full rounded-3xl border"
        />
      )}
    </div>
  );
}
