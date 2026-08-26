import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { telHref } from "@/lib/utils";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
] as const;

const Wordmark = () => (
  <Link href="/" className="flex items-center gap-2.5">
    <Image
      src="/logo.jpeg"
      alt="PT. Antar Mitra Persada"
      width={40}
      height={40}
      priority
      className="size-10 rounded-full object-cover"
    />
    <span className="hidden text-sm leading-tight font-extrabold tracking-tight sm:inline">
      Antar Mitra Persada
    </span>
  </Link>
);

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const { address, phone, email, catalogUrl } = await getProfile();

  return (
    <>
      {/* Wordmark utuh di kiri; di layar sempit nav turun ke baris kedua —
          empat tautan tidak perlu disembunyikan di balik hamburger. */}
      <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-3">
          <Wordmark />
          {/* Mobile: CTA sebaris dengan wordmark, nav turun ke baris kedua —
              dua baris, bukan tiga. Desktop: wordmark · nav · CTA sebaris. */}
          <Link
            href="/contact"
            className="order-2 ml-auto rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:order-3 sm:ml-0"
          >
            Hubungi Kami
          </Link>
          <ul className="order-3 flex w-full flex-wrap items-center gap-x-6 gap-y-2 sm:order-2 sm:ml-auto sm:w-auto">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer hanya memuat yang benar-benar ada — tanpa tautan sosial
          (akunnya belum ada) dan tanpa halaman legal yang belum ditulis. */}
      <footer className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="text-base font-extrabold tracking-tight">
                PT. Antar Mitra Persada
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-foreground/70">
                {address && (
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <span className="max-w-[36ch] whitespace-pre-line">
                      {address}
                    </span>
                  </li>
                )}
                {phone && (
                  <li className="flex gap-3">
                    <Phone className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <a
                      href={telHref(phone)}
                      className="underline-offset-4 hover:text-ink-foreground hover:underline"
                    >
                      {phone}
                    </a>
                  </li>
                )}
                {email && (
                  <li className="flex gap-3">
                    <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <a
                      href={`mailto:${email}`}
                      className="underline-offset-4 hover:text-ink-foreground hover:underline"
                    >
                      {email}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <nav aria-label="Halaman">
              <p className="text-sm font-semibold">Halaman</p>
              <ul className="mt-4 space-y-3 text-sm">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ink-foreground/70 underline-offset-4 hover:text-ink-foreground hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-sm font-semibold">Pengadaan</p>
              <ul className="mt-4 space-y-3 text-sm">
                {catalogUrl && (
                  <li>
                    <a
                      href={catalogUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold underline-offset-4 hover:underline"
                    >
                      Katalog INAPROC ↗
                    </a>
                  </li>
                )}
                <li className="text-ink-foreground/70">
                  LPSE &amp; e-Katalog sektoral Kemenkes
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-baseline justify-between gap-3 border-t border-white/10 pt-6 text-xs text-ink-foreground/60">
            <p>© {new Date().getFullYear()} PT. Antar Mitra Persada</p>
            <p>Sukoharjo, Jawa Tengah</p>
          </div>
        </div>
      </footer>
    </>
  );
}
