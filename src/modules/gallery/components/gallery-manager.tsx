"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminPage } from "@/components/admin/admin-page";
import { useAdminMutation } from "@/hooks/use-admin-mutation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  GALLERY_BUCKET,
  GALLERY_MAX_BYTES,
  GALLERY_TYPES,
  type GalleryItem,
} from "../gallery.dto";
import {
  addGalleryItemAction,
  deleteGalleryItemAction,
  moveGalleryItemAction,
  updateGalleryCaptionAction,
} from "../gallery.action";

const SMALL = "h-7 rounded-full px-2.5 text-xs";

export function GalleryManager({ items }: { items: GalleryItem[] }) {
  const [uploading, setUploading] = useState(0);
  const [dragging, setDragging] = useState(false);
  const caption = useAdminMutation(updateGalleryCaptionAction, "Keterangan disimpan");
  const move = useAdminMutation(moveGalleryItemAction);
  const remove = useAdminMutation(deleteGalleryItemAction, "Foto dihapus");

  // Berkas dikirim langsung ke Storage dari browser (body fungsi Vercel
  // dibatasi ~4.5 MB); policy RLS bucket hanya mengizinkan cms_admin.
  const upload = async (files: File[]) => {
    const supabase = createClient();
    setUploading((n) => n + files.length);

    for (const file of files) {
      try {
        if (!GALLERY_TYPES.includes(file.type)) {
          throw new Error("hanya JPG atau PNG");
        }
        if (file.size > GALLERY_MAX_BYTES) throw new Error("lebih dari 5 MB");

        const path = `${crypto.randomUUID()}.${file.type === "image/png" ? "png" : "jpg"}`;
        const { error } = await supabase.storage
          .from(GALLERY_BUCKET)
          .upload(path, file, { contentType: file.type });
        if (error) throw new Error(error.message);

        try {
          await addGalleryItemAction(path);
        } catch (cause) {
          // jangan tinggalkan berkas yatim di bucket
          await supabase.storage.from(GALLERY_BUCKET).remove([path]);
          throw cause;
        }
        toast.success(`${file.name} diunggah`);
      } catch (error) {
        toast.error(`${file.name}: ${(error as Error).message}`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
  };

  const picker = (
    <input
      type="file"
      accept={GALLERY_TYPES.join(",")}
      multiple
      className="sr-only"
      onChange={(event) => {
        upload([...(event.target.files ?? [])]);
        event.target.value = "";
      }}
    />
  );

  return (
    <AdminPage
      title="Galeri"
      description="Foto kantor, gudang, armada, dan kegiatan. Urutan di sini sama dengan di situs."
      action={
        <label className="flex h-9 cursor-pointer items-center rounded-full bg-primary px-4 font-medium text-primary-foreground transition-colors hover:bg-primary-hover has-focus-visible:ring-3 has-focus-visible:ring-ring/30">
          Unggah foto
          {picker}
        </label>
      }
    >
      <label
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          upload([...event.dataTransfer.files]);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-1 rounded-xl border-[1.5px] border-dashed border-[#cfd5d2] bg-[#fafbfb] p-7 text-center transition-colors hover:border-primary hover:bg-[#f4f8f6]",
          dragging && "border-primary bg-[#f4f8f6]",
        )}
      >
        <span className="font-medium">
          {uploading > 0
            ? `Mengunggah ${uploading} foto…`
            : "Seret foto ke sini atau klik untuk memilih"}
        </span>
        <span className="text-[13px] text-subtle">
          JPG atau PNG, maks. 5 MB per foto. Disarankan rasio 4:3.
        </span>
        {picker}
      </label>

      {items.length === 0 ? (
        <p className="py-10 text-center text-subtle">
          Belum ada foto. Halaman Galeri tidak menampilkan apa pun sampai ada
          foto yang diunggah.
        </p>
      ) : (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="flex flex-col overflow-hidden rounded-xl border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- pratinjau admin, tidak perlu dioptimasi */}
              <img
                src={item.url}
                alt={item.caption}
                className="aspect-4/3 w-full bg-[#f1f3f2] object-cover"
              />
              <div className="flex flex-col gap-2.5 p-3">
                {/* key ikut caption: setelah tersimpan, server mengirim nilai
                    baru — input dipasang ulang, bukan defaultValue diubah. */}
                <Input
                  key={item.caption}
                  aria-label={`Keterangan foto ${index + 1}`}
                  placeholder="Keterangan foto"
                  defaultValue={item.caption}
                  className="h-8 text-[13px]"
                  onBlur={(event) => {
                    const value = event.target.value.trim();
                    if (value !== item.caption) {
                      caption.mutate({ id: item.id, caption: value });
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") event.currentTarget.blur();
                  }}
                />
                <div className="flex items-center justify-between gap-1">
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      className={SMALL}
                      disabled={index === 0 || move.isPending}
                      onClick={() => move.mutate({ id: item.id, direction: -1 })}
                    >
                      ← Geser
                    </Button>
                    <Button
                      variant="outline"
                      className={SMALL}
                      disabled={index === items.length - 1 || move.isPending}
                      onClick={() => move.mutate({ id: item.id, direction: 1 })}
                    >
                      Geser →
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    className={SMALL}
                    disabled={remove.isPending}
                    onClick={() => {
                      if (confirm("Hapus foto ini dari galeri?")) {
                        remove.mutate(item.id);
                      }
                    }}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
