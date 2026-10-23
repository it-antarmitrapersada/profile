import type { Metadata } from "next";
import Image from "next/image";
import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { listGallery } from "@/modules/gallery/gallery.service";
import { CtaBand, PageHero } from "@/components/section";

export const metadata: Metadata = {
  alternates: { canonical: "/gallery" },
  title: "Galeri",
  description: "Foto kantor, tim, dan kegiatan PT. Antar Mitra Persada.",
};

export default async function GalleryPage() {
  const [{ catalogUrl, phone }, photos] = await Promise.all([
    getProfile(),
    listGallery(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Galeri"
        title="Kantor, tim, dan kegiatan kami"
        className="pb-[clamp(48px,6vw,72px)]"
      />

      {photos.length > 0 && (
        <div className="wrap grid grid-cols-[repeat(auto-fill,minmax(min(100%,340px),1fr))] gap-x-6 gap-y-8 pb-[clamp(80px,11vw,140px)]">
          {photos.map((photo) => (
            <figure key={photo.id} className="flex flex-col gap-3">
              <div className="relative aspect-4/3">
                <Image
                  src={photo.url}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 760px) 100vw, 380px"
                  className="rounded-[4px] bg-muted object-cover"
                />
              </div>
              {photo.caption && (
                <figcaption className="text-sm text-muted-foreground">
                  {photo.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      <CtaBand catalogUrl={catalogUrl} phone={phone} />
    </>
  );
}
