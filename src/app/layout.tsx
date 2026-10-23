import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TanstackQueryProvider } from "@/components/providers/tanstack-query.provider";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";

const SITE_URL = "https://profile.ampersada.com";
const SITE_NAME = "PT. Antar Mitra Persada";
const DESCRIPTION =
  "PT. Antar Mitra Persada \u2014 Pedagang Besar Farmasi (PBF) dan distributor obat, BMHP, serta alat kesehatan di Sukoharjo, Jawa Tengah, tersedia di e-Katalog INAPROC.";

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
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PT. Antar Mitra Persada",
    title: "PT. Antar Mitra Persada",
    description: DESCRIPTION,
    images: ["/logo.jpeg"],
  },
  twitter: {
    card: "summary",
    title: "PT. Antar Mitra Persada",
    description: DESCRIPTION,
    images: ["/logo.jpeg"],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { address, phone, email, instagramUrl, linkedinUrl } =
    await getProfile();
  const sameAs = [instagramUrl, linkedinUrl].filter(Boolean);

  // WebSite memberi Google nama situs; tanpanya hasil pencarian menampilkan
  // domain ("ampersada.com").
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        alternateName: ["Antar Mitra Persada", "AMP Persada"],
        url: `${SITE_URL}/`,
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        alternateName: "Antar Mitra Persada",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.jpeg`,
        ...(address && { address }),
        ...(phone && { telephone: phone }),
        ...(email && { email }),
        ...(sameAs.length > 0 && { sameAs }),
      },
    ],
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
            __html: JSON.stringify(jsonLd),
          }}
        />
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
