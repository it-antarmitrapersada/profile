"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CompanyProfile, CoreValue } from "../company-profile.dto";
import { useUpdateProfile } from "../hooks/use-update-profile";
import { ICON_NAMES } from "./value-icon";

const EMPTY_VALUE: CoreValue = { name: "", description: "", icon: "sparkles" };

export function ProfileForm({ profile }: { profile: CompanyProfile }) {
  // ponytail: misi diedit sebagai satu textarea. Satu baris = paragraf,
  // beberapa baris = daftar poin — bentuk tampilan ikut jumlah baris, jadi
  // tidak ada saklar "paragraf atau poin" yang harus diurus admin.
  const [mission, setMission] = useState(profile.mission.join("\n"));
  const [coreValues, setCoreValues] = useState<CoreValue[]>(profile.coreValues);
  const { mutate, isPending, isSuccess, error } = useUpdateProfile();

  const patchValue = (index: number, patch: Partial<CoreValue>) =>
    setCoreValues((values) =>
      values.map((value, i) => (i === index ? { ...value, ...patch } : value)),
    );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    mutate({
      about: form.get("about") as string,
      vision: form.get("vision") as string,
      mission: mission
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
      coreValues: coreValues.filter((value) => value.name.trim()),
      address: form.get("address") as string,
      phone: form.get("phone") as string,
      email: form.get("email") as string,
      mapsEmbedUrl: form.get("mapsEmbedUrl") as string,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Tentang Perusahaan</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="about">Tentang Kami</FieldLabel>
              <Textarea
                id="about"
                name="about"
                rows={6}
                defaultValue={profile.about}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="vision">Visi</FieldLabel>
              <Textarea
                id="vision"
                name="vision"
                rows={3}
                defaultValue={profile.vision}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="mission">Misi</FieldLabel>
              <Textarea
                id="mission"
                rows={6}
                value={mission}
                onChange={(event) => setMission(event.target.value)}
              />
              <FieldDescription>
                Satu baris ditampilkan sebagai paragraf. Beberapa baris
                ditampilkan sebagai daftar bernomor, satu poin per baris.
                Baris kosong diabaikan.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nilai Perusahaan</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-start"
            >
              <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_10rem]">
                <Input
                  aria-label={`Nama nilai ${index + 1}`}
                  placeholder="Nama nilai"
                  value={value.name}
                  onChange={(event) =>
                    patchValue(index, { name: event.target.value })
                  }
                />
                <select
                  aria-label={`Ikon nilai ${index + 1}`}
                  className="h-9 rounded-md border bg-transparent px-3 text-sm"
                  value={value.icon}
                  onChange={(event) =>
                    patchValue(index, { icon: event.target.value })
                  }
                >
                  {ICON_NAMES.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <Textarea
                  aria-label={`Deskripsi nilai ${index + 1}`}
                  className="sm:col-span-2"
                  placeholder="Deskripsi singkat"
                  rows={2}
                  value={value.description}
                  onChange={(event) =>
                    patchValue(index, { description: event.target.value })
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Hapus nilai ${index + 1}`}
                onClick={() =>
                  setCoreValues((values) =>
                    values.filter((_, i) => i !== index),
                  )
                }
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="self-start"
            disabled={coreValues.length >= 12}
            onClick={() => setCoreValues((values) => [...values, EMPTY_VALUE])}
          >
            <Plus className="size-4" /> Tambah nilai
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kontak</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="address">Alamat</FieldLabel>
              <Textarea
                id="address"
                name="address"
                rows={3}
                defaultValue={profile.address}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">Telepon</FieldLabel>
              <Input id="phone" name="phone" defaultValue={profile.phone} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={profile.email}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="mapsEmbedUrl">URL Embed Peta</FieldLabel>
              <Input
                id="mapsEmbedUrl"
                name="mapsEmbedUrl"
                defaultValue={profile.mapsEmbedUrl}
              />
              <FieldDescription>
                Ambil dari Google Maps → Bagikan → Sematkan peta → salin nilai
                src pada iframe. Kosongkan untuk menyembunyikan peta.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Menyimpan…" : "Simpan"}
        </Button>
        {isSuccess && (
          <span role="status" className="text-sm text-muted-foreground">
            Tersimpan.
          </span>
        )}
        {error && (
          <span role="alert" className="text-sm text-destructive">
            {error.message}
          </span>
        )}
      </div>
    </form>
  );
}
