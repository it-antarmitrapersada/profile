import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";

export const metadata: Metadata = {
  title: "Kontak | PT. Antar Mitra Persada",
  description: "Alamat, telepon, dan email PT. Antar Mitra Persada.",
};

export default async function ContactPage() {
  const { address, phone, email, mapsEmbedUrl } = await getProfile();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Kontak</h1>

      <dl className="mt-8 grid gap-6 sm:grid-cols-3">
        {[
          { icon: MapPin, label: "Alamat", value: address, href: undefined },
          { icon: Phone, label: "Telepon", value: phone, href: `tel:${phone}` },
          { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
        ]
          .filter((item) => item.value)
          .map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <dt className="text-sm font-medium">{label}</dt>
                <dd className="text-sm whitespace-pre-line text-muted-foreground">
                  {href ? (
                    <a href={href} className="underline underline-offset-4">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            </div>
          ))}
      </dl>

      {mapsEmbedUrl && (
        <iframe
          src={mapsEmbedUrl}
          title="Peta lokasi kantor"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-10 aspect-video w-full rounded-lg border"
        />
      )}
    </div>
  );
}
