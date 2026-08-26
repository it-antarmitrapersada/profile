import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TanstackQueryProvider } from "@/components/providers/tanstack-query.provider";

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
  title: "PT. Antar Mitra Persada",
  description:
    "Profil PT. Antar Mitra Persada \u2014 visi, misi, nilai perusahaan, dan informasi kontak.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
