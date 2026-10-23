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

  const account = await prisma.pg_users.findUnique({
    where: { id: user.id },
    select: { role: true },
  });

  if (!account?.role.some((role) => ADMIN_ROLES.includes(role))) {
    redirect("/");
  }

  return { userId: user.id, email: user.email ?? "" };
};
