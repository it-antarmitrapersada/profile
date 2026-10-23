import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/components/nav-link";
import { SOCIALS, WHATSAPP } from "@/components/section";
import { telHref } from "@/lib/utils";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";

// Statis + revalidatePath saat admin menyimpan, jadi perpindahan halaman
// tidak menunggu database. Jam ini hanya jaring pengaman untuk perubahan
// yang tidak lewat /admin (SQL manual).
export const revalidate = 3600;

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/about", label: "Tentang" },
  { href: "/gallery", label: "Galeri" },
  { href: "/careers", label: "Karir" },
  { href: "/contact", label: "Kontak" },
] as const;

const FOOTER_LINK = "transition-colors hover:text-foreground";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const { address, phone, email, catalogUrl } = await getProfile();

  return (
    <>
      {/* Enam tautan muat dibungkus ke baris kedua di layar sempit —
          tidak perlu disembunyikan di balik hamburger. */}
      <header className="sticky top-0 z-10 border-b border-[#eef0ef] bg-white/94 backdrop-blur-[8px]">
        <div className="wrap flex flex-wrap items-center justify-between gap-5 py-5">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="AM Persada"
              width={1297}
              height={946}
              priority
              className="h-[34px] w-auto"
            />
            <span className="font-semibold">Antar Mitra Persada</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-x-[clamp(16px,3vw,36px)] gap-y-2 text-[15px]">
            {NAV.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Hanya yang terisi di CMS yang tayang — tanpa tautan mati. */}
      <footer className="bg-muted">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-12 gap-y-10 py-12 text-sm text-muted-foreground">
          <div className="flex flex-col gap-2 leading-relaxed">
            <span className="font-semibold text-foreground">
              PT. Antar Mitra Persada
            </span>
            {address && <span className="whitespace-pre-line">{address}</span>}
          </div>
          <div className="flex flex-col items-start gap-2">
            {phone && (
              <a href={telHref(phone)} className={FOOTER_LINK}>
                {phone}
              </a>
            )}
            <a
              href={WHATSAPP.href}
              target="_blank"
              rel="noopener"
              className={FOOTER_LINK}
            >
              WhatsApp {WHATSAPP.label}
            </a>
            {email && (
              <a href={`mailto:${email}`} className={FOOTER_LINK}>
                {email}
              </a>
            )}
          </div>
          <div className="flex flex-col items-start gap-2">
            {catalogUrl && (
              <a
                href={catalogUrl}
                target="_blank"
                rel="noopener"
                className={FOOTER_LINK}
              >
                Katalog INAPROC ↗
              </a>
            )}
            <span>LPSE &amp; e-Katalog sektoral Kemenkes</span>
            <Link href="/careers" className={FOOTER_LINK}>
              Karir
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener"
                className={FOOTER_LINK}
              >
                {social.label} ↗
              </a>
            ))}
          </div>
        </div>
        <div className="wrap flex flex-wrap justify-between gap-3 border-t border-[#e3e7e5] pt-5 pb-8 text-[13px] text-faint">
          <span>© {new Date().getFullYear()} PT. Antar Mitra Persada</span>
          <span>Sukoharjo, Jawa Tengah</span>
        </div>
      </footer>
    </>
  );
}
