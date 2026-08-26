import Link from "next/link";
import { Box } from "lucide-react";

// Data profil dibaca per request: satu baris, satu primary key. Konsekuensinya
// disengaja — build tidak butuh DATABASE_URL dan perubahan admin langsung
// terlihat tanpa logika revalidasi yang bisa ketinggalan route baru.
export const dynamic = "force-dynamic";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Kontak" },
] as const;

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Box className="size-4" />
            </span>
            PT. Antar Mitra Persada
          </Link>
          <ul className="ml-auto flex items-center gap-5 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted-foreground">
          © {new Date().getFullYear()} PT. Antar Mitra Persada
        </div>
      </footer>
    </>
  );
}
