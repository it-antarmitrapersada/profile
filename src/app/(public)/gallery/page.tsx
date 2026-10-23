import type { Metadata } from "next";
import Image from "next/image";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { CtaBand, PageHero } from "@/components/section";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Kantor dan gudang PT. Antar Mitra Persada di Sukoharjo.",
};

// ponytail: daftar statis sampai ada kolom `gallery jsonb` di CMS — saat itu
// ganti dengan field dari getProfile().
const PHOTOS = [
  { src: "/graha-berseri.jpg", caption: "Graha Berseri, Sukoharjo" },
  { src: "/warehouse.jpg", caption: "Gudang penyimpanan" },
];

export default async function GalleryPage() {
  const { catalogUrl, phone } = await getProfile();

  return (
    <>
      <PageHero
        eyebrow="Galeri"
        title="Kantor dan gudang kami"
        className="pb-[clamp(48px,6vw,72px)]"
      />

      <div className="wrap grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-x-6 gap-y-8 pb-[clamp(80px,11vw,140px)]">
        {PHOTOS.map((photo) => (
          <figure key={photo.src} className="flex flex-col gap-3">
            <div className="relative aspect-4/3">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                sizes="(max-width: 760px) 100vw, 380px"
                className="rounded-[4px] object-cover"
              />
            </div>
            <figcaption className="text-sm text-muted-foreground">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <CtaBand catalogUrl={catalogUrl} phone={phone} />
    </>
  );
}
