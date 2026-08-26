import Link from "next/link";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { Eyebrow } from "@/components/section";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/about", label: "Tentang" },
  { href: "/contact", label: "Kontak" },
] as const;

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const { address, phone, email, catalogUrl } = await getProfile();

  return (
    <>
      {/* Di layar sempit wordmark dan nav tidak muat sebaris: wordmark
          dijaga utuh, nav turun ke baris kedua. Tanpa menu hamburger —
          empat tautan tidak perlu disembunyikan di balik tombol. */}
      <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-4 sm:py-5">
          <Link
            href="/"
            className="font-display text-sm font-bold tracking-tight whitespace-nowrap uppercase"
          >
            Antar Mitra Persada
          </Link>
          <ul className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 sm:ml-auto sm:w-auto sm:gap-6">
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

      {/* Footer hanya memuat yang benar-benar ada. Tidak ada tautan sosial
          karena akunnya belum ada, tidak ada "Kebijakan Privasi" karena
          halamannya belum ada — tautan mati lebih merugikan daripada kolom
          yang lebih pendek. */}
      <footer id="footer" className="border-t bg-background scroll-mt-20">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <p className="font-display text-base font-bold tracking-tight uppercase">
                PT. Antar Mitra Persada
              </p>
              <p className="mt-4 max-w-[34ch] font-body leading-[1.7] whitespace-pre-line text-muted-foreground">
                {address}
              </p>
              <dl className="mt-6 space-y-2 font-body text-muted-foreground">
                {phone && (
                  <div className="flex gap-3">
                    <dt className="sr-only">Telepon</dt>
                    <dd>
                      <a
                        href={`tel:${phone}`}
                        className="underline-offset-4 hover:text-foreground hover:underline"
                      >
                        {phone}
                      </a>
                    </dd>
                  </div>
                )}
                {email && (
                  <div className="flex gap-3">
                    <dt className="sr-only">Surel</dt>
                    <dd>
                      <a
                        href={`mailto:${email}`}
                        className="underline-offset-4 hover:text-foreground hover:underline"
                      >
                        {email}
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <nav aria-label="Halaman">
              <Eyebrow className="border-b pb-3">Halaman</Eyebrow>
              <ul className="mt-4 space-y-3">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <Eyebrow className="border-b pb-3">Pengadaan</Eyebrow>
              <ul className="mt-4 space-y-3">
                {catalogUrl && (
                  <li>
                    <a
                      href={catalogUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-body text-primary underline-offset-4 hover:underline"
                    >
                      Katalog INAPROC ↗
                    </a>
                  </li>
                )}
                <li className="font-body text-muted-foreground">
                  LPSE &amp; e-Katalog sektoral Kemenkes
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap items-baseline justify-between gap-3 border-t pt-6">
            <Eyebrow>
              © {new Date().getFullYear()} PT. Antar Mitra Persada
            </Eyebrow>
            <Eyebrow>Sukoharjo, Jawa Tengah</Eyebrow>
          </div>
        </div>
      </footer>
    </>
  );
}
