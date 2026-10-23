import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { listJobs } from "@/modules/careers/careers.service";
import { JobsManager } from "@/modules/careers/components/jobs-manager";

export default async function AdminCareersPage() {
  const [jobs, profile] = await Promise.all([listJobs(), getProfile()]);
  return <JobsManager jobs={jobs} profile={profile} />;
}
