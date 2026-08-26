import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Situs ini publik — hanya /admin yang butuh sesi. Membatasi matcher di
     * sini berarti pengunjung anonim tidak pernah memicu getClaims()
     * (round-trip jaringan ke Supabase) saat membaca halaman publik.
     */
    "/admin/:path*",
    "/login",
  ],
};
