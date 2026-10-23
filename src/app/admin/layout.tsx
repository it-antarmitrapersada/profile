import prisma from "@/lib/prisma";
import { requireAdmin } from "@/modules/auth/require-admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const { email } = await requireAdmin();
  const [photoCount, openJobCount] = await Promise.all([
    prisma.gallery_items.count(),
    prisma.job_openings.count({ where: { is_open: true } }),
  ]);

  return (
    <SidebarProvider className="text-sm">
      <AdminSidebar
        email={email}
        photoCount={photoCount}
        openJobCount={openJobCount}
      />
      <SidebarInset className="min-w-0 md:border md:border-[#eceeed] md:peer-data-[variant=inset]:rounded-xl">
        {children}
      </SidebarInset>
      <Toaster position="bottom-right" />
    </SidebarProvider>
  );
}
