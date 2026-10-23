import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

/**
 * Role khusus website, sengaja terpisah dari role ERP — menambah admin di
 * sistem internal tidak otomatis menambah editor website.
 * Diberikan lewat prisma/sql/002_grant_cms_admin.sql. ERP menulis role
 * dengan titik (`hrd.karyawan.edit`), jadi `cms.admin` juga diterima.
 */
export const ADMIN_ROLES = ["cms_admin", "cms.admin"];

export const requireAdmin = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // pg_users milik ERP (schema public) sengaja tidak di-introspect Prisma.
  const [account] = await prisma.$queryRaw<{ role: string[] }[]>`
    select role from public.pg_users where id = ${user.id}::uuid
  `;

  if (!account?.role.some((role) => ADMIN_ROLES.includes(role))) {
    redirect("/");
  }

  return { userId: user.id, email: user.email ?? "" };
};
