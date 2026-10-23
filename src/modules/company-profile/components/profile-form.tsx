"use client";

import { useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AdminPage, AdminSection } from "@/components/admin/admin-page";
import { useAdminMutation } from "@/hooks/use-admin-mutation";
import { cn } from "@/lib/utils";
import type { CompanyProfile, Metric } from "../company-profile.dto";
import { updateProfileAction } from "../update-profile/update-profile.action";

export type ProfileSection = "home" | "about" | "services" | "contact";

const PAGES: Record<ProfileSection, { title: string; heading: string; description: string }> = {
  home: {
    title: "Beranda",
    heading: "Beranda",
    description: "Angka, legalitas, dan jangkauan wilayah yang tampil di halaman utama.",
  },
  about: {
    title: "Tentang",
    heading: "Tentang perusahaan",
    description: "Profil, visi, misi, nilai HEBAT, dan pendiri.",
  },
  services: {
    title: "Layanan",
    heading: "Layanan",
    description: "Penjelasan sistem satu pintu dan tautan e-Katalog.",
  },
  contact: {
    title: "Kontak & media sosial",
    heading: "Kontak & media sosial",
    description: "Tampil di halaman Kontak dan footer. Kolom kosong tidak ditampilkan.",
  },
};

const EMPTY_METRIC: Metric = { label: "", value: "", note: "" };
const MONO = "font-mono text-[13px]";

type TextKey = {
  [K in keyof CompanyProfile]: CompanyProfile[K] extends string ? K : never;
}[keyof CompanyProfile];

/** Satu kolom: label di atas, petunjuk di bawah. */
const Row = ({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: React.ReactNode;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-2">
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
    {hint && <p className="text-[13px] text-subtle">{hint}</p>}
  </div>
);

export function ProfileForm({
  profile,
  section,
}: {
  profile: CompanyProfile;
  section: ProfileSection;
}) {
  // Metrik tampil sebagai tabel tiga baris tetap.
  const [initial] = useState(() => ({
    ...profile,
    metrics: [
      ...profile.metrics,
      ...Array(Math.max(0, 3 - profile.metrics.length)).fill(EMPTY_METRIC),
    ],
  }));
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [savedAt, setSavedAt] = useState("");
  const [region, setRegion] = useState("");
  const { mutate, isPending } = useAdminMutation(
    updateProfileAction,
    "Perubahan disimpan",
  );
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  const page = PAGES[section];

  const text = (key: TextKey) => ({
    id: key,
    value: draft[key],
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setDraft((prev) => ({ ...prev, [key]: event.target.value })),
  });

  const patchList = <K extends "metrics" | "coreValues">(
    key: K,
    index: number,
    patch: Partial<CompanyProfile[K][number]>,
  ) =>
    setDraft((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }));

  const addRegion = () => {
    const name = region.trim();
    if (name && !draft.coverage.includes(name)) {
      setDraft((prev) => ({ ...prev, coverage: [...prev.coverage, name] }));
    }
    setRegion("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate(
      {
        ...draft,
        mission: draft.mission.map((line) => line.trim()).filter(Boolean),
        metrics: draft.metrics.filter(
          (metric) => metric.label.trim() && metric.value.trim(),
        ),
      },
      {
        onSuccess: () => {
          setSaved(draft);
          setSavedAt(
            new Date().toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          );
        },
      },
    );
  };

  return (
    <AdminPage
      {...page}
      topbar={
        <>
          <span
            role="status"
            className={cn(
              "text-[13px] max-sm:hidden",
              dirty ? "text-[#a15c07]" : "text-subtle",
            )}
          >
            {dirty
              ? "Ada perubahan belum disimpan"
              : savedAt
                ? `Tersimpan ${savedAt}`
                : "Semua perubahan tersimpan"}
          </span>
          <Button type="submit" form="profile-form" disabled={isPending || !dirty}>
            {isPending ? "Menyimpan…" : "Simpan perubahan"}
          </Button>
        </>
      }
    >
      <form id="profile-form" onSubmit={handleSubmit} className="contents">
        {section === "home" && (
          <>
            <AdminSection
              title="Angka pelanggan"
              description='Diisi manual. Tulis apa adanya, misalnya "120+".'
            >
              <Row label="Total pelanggan" htmlFor="totalCustomers">
                <Input {...text("totalCustomers")} className="max-w-[200px]" />
              </Row>
              <div className="grid gap-x-3 gap-y-2 sm:grid-cols-[120px_1fr_1.6fr]">
                {["Angka", "Label", "Keterangan"].map((label) => (
                  <span key={label} className="text-[13px] text-subtle max-sm:hidden">
                    {label}
                  </span>
                ))}
                {draft.metrics.map((metric, index) => (
                  <div key={index} className="contents max-sm:mb-3 max-sm:grid max-sm:gap-2">
                    {(["value", "label", "note"] as const).map((key) => (
                      <Input
                        key={key}
                        aria-label={`${{ value: "Angka", label: "Label", note: "Keterangan" }[key]} ${index + 1}`}
                        placeholder={{ value: "120+", label: "Rumah Sakit", note: "Keterangan" }[key]}
                        value={metric[key]}
                        onChange={(event) =>
                          patchList("metrics", index, { [key]: event.target.value })
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            </AdminSection>

            <AdminSection
              title="Legalitas"
              description="Isi hanya nomor dari dokumen resmi. Kolom kosong tidak ditampilkan."
            >
              {(
                [
                  ["pbfLicenseNo", "Izin PBF"],
                  ["cdobCertNo", "Sertifikat CDOB"],
                  ["businessIdNo", "NIB"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="grid gap-2 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-3">
                  <Label htmlFor={key}>{label}</Label>
                  <Input {...text(key)} className={MONO} />
                </div>
              ))}
            </AdminSection>

            <AdminSection
              title="Jangkauan wilayah"
              description="Tekan Enter untuk menambah wilayah."
            >
              <div className="flex flex-wrap items-center gap-2">
                {draft.coverage.map((name) => (
                  <span
                    key={name}
                    className="flex h-7 items-center gap-1 rounded-full border bg-[#f7f8f8] pr-1 pl-2.5 text-[13px]"
                  >
                    {name}
                    <button
                      type="button"
                      aria-label={`Hapus ${name}`}
                      onClick={() =>
                        setDraft((prev) => ({
                          ...prev,
                          coverage: prev.coverage.filter((item) => item !== name),
                        }))
                      }
                      className="grid size-5 place-items-center rounded-full text-subtle hover:text-foreground"
                    >
                      <XIcon className="size-3" />
                    </button>
                  </span>
                ))}
                <input
                  aria-label="Tambah wilayah"
                  placeholder="Tambah wilayah…"
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    addRegion();
                  }}
                  className="h-7 w-[150px] rounded-full border border-dashed border-[#cfd5d2] px-2.5 text-[13px] outline-none focus:border-primary"
                />
              </div>
            </AdminSection>
          </>
        )}

        {section === "about" && (
          <>
            <AdminSection>
              <Row
                label="Profil perusahaan"
                htmlFor="about"
                hint="Paragraf pertama dipakai sebagai judul halaman Tentang. Pisahkan paragraf dengan satu baris kosong."
              >
                <Textarea {...text("about")} rows={8} />
              </Row>
              <Row label="Visi" htmlFor="vision">
                <Textarea {...text("vision")} rows={2} />
              </Row>
              <Row label="Misi" htmlFor="mission" hint="Satu poin per baris.">
                <Textarea
                  id="mission"
                  rows={4}
                  value={draft.mission.join("\n")}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      mission: event.target.value.split("\n"),
                    }))
                  }
                />
              </Row>
            </AdminSection>

            <AdminSection
              title="Nilai perusahaan"
              description="Urutan membentuk akronim HEBAT. Jangan diubah tanpa persetujuan manajemen."
            >
              {draft.coreValues.map((value, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[36px_1fr] items-center gap-3 sm:grid-cols-[36px_160px_1fr]"
                >
                  <span
                    aria-hidden
                    className="grid size-9 place-items-center rounded-lg bg-[#eef3f1] font-semibold text-primary"
                  >
                    {initial.coreValues[index]?.name.charAt(0).toUpperCase()}
                  </span>
                  <Input
                    aria-label={`Nama nilai ${index + 1}`}
                    value={value.name}
                    onChange={(event) =>
                      patchList("coreValues", index, { name: event.target.value })
                    }
                  />
                  <Input
                    aria-label={`Deskripsi nilai ${index + 1}`}
                    className="max-sm:col-span-2"
                    value={value.description}
                    onChange={(event) =>
                      patchList("coreValues", index, {
                        description: event.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </AdminSection>

            <AdminSection title="Pendiri">
              <div className="grid gap-4 sm:grid-cols-2">
                <Row label="Nama" htmlFor="founderName">
                  <Input {...text("founderName")} />
                </Row>
                <Row label="Jabatan" htmlFor="founderRole">
                  <Input {...text("founderRole")} />
                </Row>
              </div>
              <Row
                label="Catatan"
                htmlFor="founderNote"
                hint="Kosongkan nama untuk menyembunyikan seluruh bagian Pendiri."
              >
                <Textarea {...text("founderNote")} rows={3} />
              </Row>
            </AdminSection>
          </>
        )}

        {section === "services" && (
          <AdminSection>
            <Row label="Judul" htmlFor="advantageTitle">
              <Input {...text("advantageTitle")} />
            </Row>
            <Row
              label="Isi"
              htmlFor="advantageBody"
              hint="Pisahkan paragraf dengan satu baris kosong."
            >
              <Textarea {...text("advantageBody")} rows={8} />
            </Row>
            <Row
              label="URL katalog INAPROC"
              htmlFor="catalogUrl"
              hint='Dipakai oleh semua tombol "Buka Katalog INAPROC".'
            >
              <Input {...text("catalogUrl")} type="url" className={MONO} />
            </Row>
          </AdminSection>
        )}

        {section === "contact" && (
          <>
            <AdminSection>
              <Row label="Alamat" htmlFor="address">
                <Textarea {...text("address")} rows={2} />
              </Row>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
                <Row label="Telepon" htmlFor="phone">
                  <Input {...text("phone")} type="tel" />
                </Row>
                <Row label="Surel" htmlFor="email">
                  <Input {...text("email")} type="email" />
                </Row>
              </div>
              <Row
                label="URL embed Google Maps"
                htmlFor="mapsEmbedUrl"
                hint="Google Maps → Bagikan → Sematkan peta → salin URL di dalam src."
              >
                <Input
                  {...text("mapsEmbedUrl")}
                  type="url"
                  placeholder="https://www.google.com/maps/embed?pb=…"
                  className={MONO}
                />
              </Row>
            </AdminSection>

            <AdminSection title="Media sosial">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
                <Row label="Instagram" htmlFor="instagramUrl">
                  <Input
                    {...text("instagramUrl")}
                    type="url"
                    placeholder="https://instagram.com/…"
                  />
                </Row>
                <Row label="LinkedIn" htmlFor="linkedinUrl">
                  <Input
                    {...text("linkedinUrl")}
                    type="url"
                    placeholder="https://linkedin.com/company/…"
                  />
                </Row>
              </div>
            </AdminSection>
          </>
        )}
      </form>
    </AdminPage>
  );
}
