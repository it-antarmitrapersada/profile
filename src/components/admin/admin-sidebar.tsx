"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SignOutButton } from "@/modules/auth/components/signout-button";

const CONTENT = [
  { href: "/admin", label: "Beranda" },
  { href: "/admin/about", label: "Tentang" },
  { href: "/admin/services", label: "Layanan" },
  { href: "/admin/contact", label: "Kontak & media sosial" },
];

export function AdminSidebar({
  email,
  photoCount,
  openJobCount,
}: {
  email: string;
  photoCount: number;
  openJobCount: number;
}) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  const item = (href: string, label: string, badge?: string) => (
    <SidebarMenuItem key={href}>
      <SidebarMenuButton
        isActive={pathname === href}
        render={<Link href={href} onClick={() => setOpenMobile(false)} />}
      >
        {label}
      </SidebarMenuButton>
      {badge && <SidebarMenuBadge className="text-subtle">{badge}</SidebarMenuBadge>}
    </SidebarMenuItem>
  );

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex-row items-center gap-2.5">
        <Image
          src="/logo.png"
          alt=""
          width={1297}
          height={946}
          className="h-[30px] w-auto"
        />
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-sm font-semibold">AM Persada</span>
          <span className="text-xs text-subtle">Admin Konten</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Konten halaman</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {CONTENT.map(({ href, label }) => item(href, label))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Media &amp; rekrutmen</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item("/admin/gallery", "Galeri", String(photoCount))}
              {item(
                "/admin/careers",
                "Lowongan kerja",
                `${openJobCount} dibuka`,
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<a href="/" target="_blank" rel="noopener" />}
            >
              Lihat situs ↗
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-2.5 p-2">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#dfe7e4] text-xs font-semibold text-primary"
          >
            {email.slice(0, 2).toUpperCase()}
          </span>
          <div className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="text-[13px] font-medium">Admin</span>
            <span className="truncate text-xs text-subtle">{email}</span>
          </div>
          <SignOutButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
