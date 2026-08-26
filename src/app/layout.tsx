import type { Metadata } from "next";
import { Archivo, Geist_Mono, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TanstackQueryProvider } from "@/components/providers/tanstack-query.provider";

// Tiga peran, tiga suara. Display membawa karakter, body membawa teks panjang,
// mono dipakai untuk label dan penomoran — meniru penandaan dokumen izin.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  weight: ["400", "600"],
});

// UI chrome dan form admin tetap sans — serif hanya untuk prosa halaman publik.
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
        archivo.variable,
        sourceSerif.variable,
        inter.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  );
}
