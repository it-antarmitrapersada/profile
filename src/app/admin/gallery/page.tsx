import { listGallery } from "@/modules/gallery/gallery.service";
import { GalleryManager } from "@/modules/gallery/components/gallery-manager";

export default async function AdminGalleryPage() {
  return <GalleryManager items={await listGallery()} />;
}
