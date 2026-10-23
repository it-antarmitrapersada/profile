import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TanstackQueryProvider } from "@/components/providers/tanstack-query.provider";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";

const SITE_URL = "https://profile.ampersada.com";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

// Hanya untuk nomor legal dan indeks.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PT. Antar Mitra Persada",
    template: "%s | PT. Antar Mitra Persada",
  },
  verification: {
    google: "FFZBqsPV3PPikCpEp_bBQjlks3oWVUFKQZ4O9FhKqlA",
  },
  description:
    "Profil PT. Antar Mitra Persada \u2014 visi, misi, nilai perusahaan, dan informasi kontak.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PT. Antar Mitra Persada",
    title: "PT. Antar Mitra Persada",
    description:
      "Profil PT. Antar Mitra Persada \u2014 visi, misi, nilai perusahaan, dan informasi kontak.",
    images: ["/logo.jpeg"],
  },
  twitter: {
    card: "summary",
    title: "PT. Antar Mitra Persada",
    description:
      "Profil PT. Antar Mitra Persada \u2014 visi, misi, nilai perusahaan, dan informasi kontak.",
    images: ["/logo.jpeg"],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { address, phone, email } = await getProfile();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT. Antar Mitra Persada",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpeg`,
    ...(address && { address }),
    ...(phone && { telephone: phone }),
    ...(email && { email }),
  };

  return (
    <html
      lang="id"
      className={cn(
        "h-full",
        "antialiased",
        plexMono.variable,
        instrumentSans.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
