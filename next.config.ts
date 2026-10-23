import type { NextConfig } from "next";

const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!);

const nextConfig: NextConfig = {
  images: {
    // Foto galeri & flyer lowongan dari bucket publik Supabase Storage — hanya path itu.
    remotePatterns: [
      new URL(`${supabaseUrl.origin}/storage/v1/object/public/gallery/**`),
      new URL(`${supabaseUrl.origin}/storage/v1/object/public/job-flyers/**`),
    ],
    // Supabase lokal (127.0.0.1) diblokir optimizer secara default.
    dangerouslyAllowLocalIP: ["127.0.0.1", "localhost"].includes(
      supabaseUrl.hostname,
    ),
  },
};

export default nextConfig;
