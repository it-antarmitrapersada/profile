"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/components/nav-link";
import { PrimaryLink } from "@/components/section";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/about", label: "Tentang" },
  { href: "/gallery", label: "Galeri" },
  { href: "/careers", label: "Karir" },
  { href: "/contact", label: "Kontak" },
] as const;

/** Nav horizontal ≥860px; di bawahnya tombol "Menu" membuka panel. */
export function SiteHeader({ catalogUrl }: { catalogUrl: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-10 border-b border-[#eef0ef] bg-white/94 backdrop-blur-[8px]">
      <div className="wrap flex items-center justify-between gap-5 py-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
        >
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
        <nav className="flex items-center gap-x-[clamp(16px,3vw,36px)] text-[15px] max-[859px]:hidden">
          {NAV.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
          className="h-11 shrink-0 rounded-full border border-[#dfe3e1] bg-white px-4 text-[15px] font-medium min-[860px]:hidden"
        >
          {open ? "Tutup" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="flex flex-col border-t border-[#eef0ef] bg-white px-5 pt-2 pb-5 min-[860px]:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "border-b border-[#eef0ef] py-3.5 text-lg",
                pathname === item.href
                  ? "font-semibold text-foreground"
                  : "text-subtle",
              )}
            >
              {item.label}
            </Link>
          ))}
          {catalogUrl && (
            <PrimaryLink href={catalogUrl} className="mt-5 py-[15px] text-center">
              Buka Katalog INAPROC ↗
            </PrimaryLink>
          )}
        </nav>
      )}
    </header>
  );
}
