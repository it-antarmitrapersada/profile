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
import type {
  CompanyProfile,
  CoreValue,
  Metric,
} from "../company-profile.dto";
import { useUpdateProfile } from "../hooks/use-update-profile";

const EMPTY_VALUE: CoreValue = { name: "", description: "" };
const EMPTY_METRIC: Metric = { label: "", value: "", note: "" };

/** Satu baris teks per item — dipakai untuk misi dan jangkauan wilayah. */
const toLines = (text: string) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export function ProfileForm({ profile }: { profile: CompanyProfile }) {
  // ponytail: misi dan jangkauan diedit sebagai satu textarea, satu per baris.
  // Ganti ke baris berulang kalau item-itemnya butuh field sendiri.
  const [mission, setMission] = useState(profile.mission.join("\n"));
  const [coverage, setCoverage] = useState(profile.coverage.join("\n"));
  const [coreValues, setCoreValues] = useState<CoreValue[]>(profile.coreValues);
  const [metrics, setMetrics] = useState<Metric[]>(profile.metrics);
  const { mutate, isPending, isSuccess, error } = useUpdateProfile();

  const patchValue = (index: number, patch: Partial<CoreValue>) =>
    setCoreValues((values) =>
      values.map((value, i) => (i === index ? { ...value, ...patch } : value)),
    );

  const patchMetric = (index: number, patch: Partial<Metric>) =>
    setMetrics((items) =>
      items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = (name: string) => (form.get(name) as string) ?? "";

    mutate({
      about: text("about"),
      vision: text("vision"),
      mission: toLines(mission),
      coreValues: coreValues.filter((value) => value.name.trim()),
      metrics: metrics.filter((metric) => metric.label.trim()),
      metricsAsOf: text("metricsAsOf"),
      coverage: toLines(coverage),
      advantageTitle: text("advantageTitle"),
      advantageBody: text("advantageBody"),
      catalogUrl: text("catalogUrl"),
      founderName: text("founderName"),
      founderRole: text("founderRole"),
      founderNote: text("founderNote"),
      address: text("address"),
      phone: text("phone"),
      email: text("email"),
      mapsEmbedUrl: text("mapsEmbedUrl"),
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
                rows={8}
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
          <FieldDescription>
            Huruf awal setiap nilai ditampilkan besar di halaman dan urutannya
            membentuk sebuah kata. Mengubah urutan, mengganti nama, atau
            menghapus satu nilai akan mengubah kata itu.
          </FieldDescription>
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-start"
            >
              <div className="grid flex-1 gap-3">
                <Input
                  aria-label={`Nama nilai ${index + 1}`}
                  placeholder="Nama nilai"
                  value={value.name}
                  onChange={(event) =>
                    patchValue(index, { name: event.target.value })
                  }
                />
                <Textarea
                  aria-label={`Deskripsi nilai ${index + 1}`}
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
          <CardTitle>Bukti &amp; Jangkauan</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-start"
            >
              <div className="grid flex-1 gap-3 sm:grid-cols-[1fr_8rem]">
                <Input
                  aria-label={`Label angka ${index + 1}`}
                  placeholder="Rumah Sakit"
                  value={metric.label}
                  onChange={(event) =>
                    patchMetric(index, { label: event.target.value })
                  }
                />
                <Input
                  aria-label={`Angka ${index + 1}`}
                  placeholder="120+"
                  value={metric.value}
                  onChange={(event) =>
                    patchMetric(index, { value: event.target.value })
                  }
                />
                <Input
                  aria-label={`Keterangan angka ${index + 1}`}
                  className="sm:col-span-2"
                  placeholder="RS pemerintah dan swasta di Indonesia"
                  value={metric.note}
                  onChange={(event) =>
                    patchMetric(index, { note: event.target.value })
                  }
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Hapus angka ${index + 1}`}
                onClick={() =>
                  setMetrics((items) => items.filter((_, i) => i !== index))
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
            disabled={metrics.length >= 6}
            onClick={() => setMetrics((items) => [...items, EMPTY_METRIC])}
          >
            <Plus className="size-4" /> Tambah angka
          </Button>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="metricsAsOf">Angka berlaku</FieldLabel>
              <Input
                id="metricsAsOf"
                name="metricsAsOf"
                placeholder="per Oktober 2025"
                defaultValue={profile.metricsAsOf}
              />
              <FieldDescription>
                Ditampilkan di dekat angka. Menyebutkan kapan angka itu berlaku
                membuatnya bisa dipercaya — perbarui setiap kali angkanya
                berubah.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="coverage">Jangkauan wilayah</FieldLabel>
              <Textarea
                id="coverage"
                rows={8}
                value={coverage}
                onChange={(event) => setCoverage(event.target.value)}
              />
              <FieldDescription>
                Satu wilayah per baris. Baris kosong diabaikan.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Keunggulan</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="advantageTitle">Judul</FieldLabel>
              <Input
                id="advantageTitle"
                name="advantageTitle"
                defaultValue={profile.advantageTitle}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="advantageBody">Penjelasan</FieldLabel>
              <Textarea
                id="advantageBody"
                name="advantageBody"
                rows={8}
                defaultValue={profile.advantageBody}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="catalogUrl">Tautan Katalog INAPROC</FieldLabel>
              <Input
                id="catalogUrl"
                name="catalogUrl"
                defaultValue={profile.catalogUrl}
              />
              <FieldDescription>
                Alamat etalase e-Katalog perusahaan. Ditampilkan sebagai ajakan
                utama di beranda dan halaman Layanan. Kosongkan untuk
                menyembunyikannya.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Owner</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="founderName">Nama</FieldLabel>
              <Input
                id="founderName"
                name="founderName"
                defaultValue={profile.founderName}
              />
              <FieldDescription>
                Kosongkan untuk menyembunyikan seluruh bagian Owner dari
                halaman publik.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="founderRole">Jabatan</FieldLabel>
              <Input
                id="founderRole"
                name="founderRole"
                defaultValue={profile.founderRole}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="founderNote">Keterangan</FieldLabel>
              <Textarea
                id="founderNote"
                name="founderNote"
                rows={4}
                defaultValue={profile.founderNote}
              />
            </Field>
          </FieldGroup>
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
