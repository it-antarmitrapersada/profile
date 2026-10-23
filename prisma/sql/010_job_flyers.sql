-- Flyer lowongan opsional: path objek di bucket `job-flyers`, "" = tanpa flyer.
alter table cms.job_openings add column flyer text not null default '';

-- Sama seperti galeri: diunggah langsung dari browser admin, izin tulis di RLS.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('job-flyers', 'job-flyers', true, 5242880, array['image/jpeg', 'image/png'])
on conflict (id) do nothing;

create policy "cms_admin kelola flyer lowongan"
on storage.objects for all to authenticated
using (bucket_id = 'job-flyers' and (select cms.is_admin()))
with check (bucket_id = 'job-flyers' and (select cms.is_admin()));
