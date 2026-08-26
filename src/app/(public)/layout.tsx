import Link from "next/link";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
] as const;

export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl items-center gap-8 px-6 py-5">
          <Link
            href="/"
            className="font-display text-sm font-bold tracking-tight uppercase"
          >
            Antar Mitra Persada
          </Link>
          <ul className="ml-auto flex items-center gap-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-foreground"
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
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-display text-sm font-semibold tracking-tight">
            PT. Antar Mitra Persada
          </p>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
