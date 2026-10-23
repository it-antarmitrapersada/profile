import prisma from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { FLYER_BUCKET, type Job, type JobInput } from "./careers.dto";

type Row = Awaited<ReturnType<typeof prisma.job_openings.findMany>>[number];

const toJob = (row: Row): Job => ({
  id: Number(row.id),
  title: row.title,
  location: row.location,
  type: row.type as Job["type"],
  deadline: row.deadline?.toISOString().slice(0, 10) ?? "",
  description: row.description,
  applyUrl: row.apply_url,
  flyer: row.flyer,
  isOpen: row.is_open,
});

const removeFlyer = async (path: string) => {
  if (!path) return;
  const supabase = await createClient();
  const { error } = await supabase.storage.from(FLYER_BUCKET).remove([path]);
  if (error) throw new Error(error.message);
};

// Kolom date: simpan sebagai tengah malam UTC supaya tanggalnya tidak bergeser.
const toDate = (date: string) => (date ? new Date(`${date}T00:00:00Z`) : null);

export const listJobs = async () =>
  (await prisma.job_openings.findMany({ orderBy: { created_at: "desc" } })).map(
    toJob,
  );

/** Dibuka dan batasnya belum lewat (hari ini masih boleh, waktu WIB). */
export const listOpenJobs = async () => {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Jakarta",
  });
  const rows = await prisma.job_openings.findMany({
    where: {
      is_open: true,
      OR: [{ deadline: null }, { deadline: { gte: toDate(today)! } }],
    },
    orderBy: [{ deadline: { sort: "asc", nulls: "last" } }],
  });
  return rows.map(toJob);
};

export const saveJob = async (id: number | null, job: JobInput) => {
  const data = {
    title: job.title,
    location: job.location,
    type: job.type,
    deadline: toDate(job.deadline),
    description: job.description,
    apply_url: job.applyUrl,
    flyer: job.flyer,
  };
  if (id) {
    const old = await prisma.job_openings.findUniqueOrThrow({
      where: { id },
      select: { flyer: true },
    });
    await prisma.job_openings.update({ where: { id }, data });
    // flyer diganti/dihapus: buang berkas lama setelah baris tersimpan
    if (old.flyer !== job.flyer) await removeFlyer(old.flyer);
  } else {
    await prisma.job_openings.create({ data });
  }
};

export const setJobOpen = async (id: number, isOpen: boolean) => {
  await prisma.job_openings.update({ where: { id }, data: { is_open: isOpen } });
};

export const deleteJob = async (id: number) => {
  const row = await prisma.job_openings.delete({ where: { id } });
  await removeFlyer(row.flyer);
};
