import type { NextConfig } from "next";

const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);

const nextConfig: NextConfig = {
  images: {
    // Foto galeri dari bucket publik Supabase Storage — hanya path itu.
    remotePatterns: [
      new URL(`${supabaseUrl.origin}/storage/v1/object/public/gallery/**`),
    ],
    // Supabase lokal (127.0.0.1) diblokir optimizer secara default.
    dangerouslyAllowLocalIP: ["127.0.0.1", "localhost"].includes(
      supabaseUrl.hostname,
    ),
  },
};

export default nextConfig;
