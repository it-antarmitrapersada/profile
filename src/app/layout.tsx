import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TanstackQueryProvider } from "@/components/providers/tanstack-query.provider";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";

const SITE_URL = "https://profile.ampersada.com";

// Satu keluarga untuk semua peran, kontras lewat berat — ExtraBold untuk
// judul, Regular untuk isi. Jakarta Sans: bulat-profesional, dan punya
// alasan lokal (dirancang untuk identitas Jakarta).
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PT. Antar Mitra Persada",
    template: "%s | PT. Antar Mitra Persada",
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
        geistMono.variable,
        jakarta.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
