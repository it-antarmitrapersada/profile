"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminPage, AdminSection } from "@/components/admin/admin-page";
import { useAdminMutation } from "@/hooks/use-admin-mutation";
import { cn } from "@/lib/utils";
import type { CompanyProfile } from "@/modules/company-profile/company-profile.dto";
import { updateProfileAction } from "@/modules/company-profile/update-profile/update-profile.action";
import {
  JOB_TYPES,
  formatDate,
  type Job,
  type JobInput,
} from "../careers.dto";
import {
  deleteJobAction,
  saveJobAction,
  setJobOpenAction,
} from "../careers.action";

const EMPTY_JOB: JobInput = {
  title: "",
  location: "Sukoharjo",
  type: "Penuh waktu",
  deadline: "",
  description: "",
  applyUrl: "",
};

const SMALL = "h-7 rounded-full px-2.5 text-xs";

export function JobsManager({
  jobs,
  profile,
}: {
  jobs: Job[];
  profile: CompanyProfile;
}) {
  const [editing, setEditing] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<JobInput>(EMPTY_JOB);
  const [formUrl, setFormUrl] = useState(profile.careersFormUrl);
  const save = useAdminMutation(saveJobAction, "Lowongan disimpan");
  const toggle = useAdminMutation(setJobOpenAction, "Status diperbarui");
  const remove = useAdminMutation(deleteJobAction, "Lowongan dihapus");
  const saveFormUrl = useAdminMutation(updateProfileAction, "Link formulir disimpan");

  const startEdit = (job: Job | null) => {
    setEditing(job?.id ?? null);
    setDraft(job ?? EMPTY_JOB);
    setOpen(true);
  };

  const field = (key: Exclude<keyof JobInput, "type">) => ({
    id: `job-${key}`,
    value: draft[key],
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setDraft((prev) => ({ ...prev, [key]: event.target.value })),
  });

  return (
    <AdminPage
      title="Lowongan kerja"
      description="Hanya lowongan berstatus Dibuka yang tampil di halaman Karir."
      action={<Button onClick={() => startEdit(null)}>Tambah lowongan</Button>}
    >
      <div className="overflow-hidden rounded-xl border">
        {jobs.length === 0 ? (
          <p className="px-4 py-10 text-center text-subtle">
            Belum ada lowongan. Halaman Karir akan menampilkan formulir lamaran
            umum.
          </p>
        ) : (
          <Table>
            <TableHeader className="bg-[#fafbfb]">
              <TableRow>
                <TableHead className="pl-4">Posisi</TableHead>
                <TableHead>Penempatan</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-4">
                  <span className="sr-only">Aksi</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="pl-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium">{job.title}</span>
                      {job.deadline && (
                        <span className="text-xs text-subtle">
                          Ditutup {formatDate(job.deadline)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>
                    <Badge
                      render={
                        <button
                          type="button"
                          title="Klik untuk mengganti status"
                          disabled={toggle.isPending}
                          onClick={() =>
                            toggle.mutate({ id: job.id, isOpen: !job.isOpen })
                          }
                        />
                      }
                      className={cn(
                        "h-6 cursor-pointer px-2.5",
                        job.isOpen
                          ? "border-[#cfe5da] bg-[#eaf4ef] text-primary"
                          : "border-border bg-[#f4f5f5] text-subtle",
                      )}
                    >
                      {job.isOpen ? "Dibuka" : "Ditutup"}
                    </Badge>
                  </TableCell>
                  <TableCell className="pr-4">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="outline"
                        className={SMALL}
                        onClick={() => startEdit(job)}
                      >
                        Ubah
                      </Button>
                      <Button
                        variant="destructive"
                        className={SMALL}
                        disabled={remove.isPending}
                        onClick={() => {
                          if (confirm(`Hapus lowongan "${job.title}"?`)) {
                            remove.mutate(job.id);
                          }
                        }}
                      >
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <AdminSection>
        <form
          className="flex flex-col gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            saveFormUrl.mutate({ ...profile, careersFormUrl: formUrl.trim() });
          }}
        >
          <Label htmlFor="careersFormUrl">
            Link formulir lamaran (Google Form)
          </Label>
          <div className="flex gap-2">
            <Input
              id="careersFormUrl"
              type="url"
              placeholder="https://forms.gle/…"
              value={formUrl}
              onChange={(event) => setFormUrl(event.target.value)}
              className="font-mono text-[13px]"
            />
            <Button
              type="submit"
              variant="outline"
              disabled={saveFormUrl.isPending || formUrl === profile.careersFormUrl}
            >
              Simpan
            </Button>
          </div>
          <p className="text-[13px] text-subtle">
            Dipakai tombol &quot;Isi formulir lamaran&quot; bila lowongan tidak
            punya link sendiri.
          </p>
        </form>
      </AdminSection>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="w-full gap-0 data-[side=right]:sm:max-w-[440px]">
          <form
            className="flex h-full flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              save.mutate(
                { id: editing, job: draft },
                { onSuccess: () => setOpen(false) },
              );
            }}
          >
            <SheetHeader className="border-b p-6 pb-4">
              <SheetTitle className="text-[17px]">
                {editing ? "Ubah lowongan" : "Tambah lowongan"}
              </SheetTitle>
              <SheetDescription>
                Lowongan tampil di halaman Karir setelah disimpan dengan status
                Dibuka.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-1 flex-col gap-4.5 overflow-auto p-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="job-title">Posisi</Label>
                <Input
                  {...field("title")}
                  required
                  placeholder="mis. Apoteker Penanggung Jawab"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex min-w-0 flex-col gap-2">
                  <Label htmlFor="job-location">Penempatan</Label>
                  <Input {...field("location")} />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <Label htmlFor="job-type">Jenis</Label>
                  <Select
                    value={draft.type}
                    onValueChange={(type) =>
                      type && setDraft((prev) => ({ ...prev, type }))
                    }
                  >
                    <SelectTrigger id="job-type" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="job-deadline">Batas lamaran</Label>
                <Input {...field("deadline")} type="date" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="job-description">Deskripsi &amp; kualifikasi</Label>
                <Textarea
                  {...field("description")}
                  rows={7}
                  placeholder="Satu poin per baris"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="job-applyUrl">
                  Link lamaran{" "}
                  <span className="font-normal text-subtle">(opsional)</span>
                </Label>
                <Input
                  {...field("applyUrl")}
                  type="url"
                  placeholder="Kosongkan untuk memakai formulir umum"
                />
              </div>
            </div>
            <SheetFooter className="flex-row justify-end gap-2 border-t px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={save.isPending}>
                {save.isPending ? "Menyimpan…" : "Simpan lowongan"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </AdminPage>
  );
}
