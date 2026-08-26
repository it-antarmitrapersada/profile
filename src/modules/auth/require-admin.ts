import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

/**
 * Role khusus website, sengaja terpisah dari role ERP — menambah admin di
 * sistem internal tidak otomatis menambah editor website.
 * Diberikan lewat prisma/sql/002_grant_cms_admin.sql.
 */
export const ADMIN_ROLE = "cms_admin";

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

  if (!account?.role.includes(ADMIN_ROLE)) {
    redirect("/");
  }

  return { userId: user.id };
};
