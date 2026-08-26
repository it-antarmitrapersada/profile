import Link from "next/link";
import { requireAdmin } from "@/modules/auth/require-admin";
import { SignOutButton } from "@/modules/auth/components/signout-button";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();

  return (
    <>
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">
          <span className="font-semibold">Admin Konten</span>
          <Link
            href="/"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Lihat situs
          </Link>
          <div className="ml-auto">
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">
        {children}
      </main>
    </>
  );
}
