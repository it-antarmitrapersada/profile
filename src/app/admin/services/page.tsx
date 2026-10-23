import { getProfile } from "@/modules/company-profile/get-profile/get-profile.service";
import { ProfileForm } from "@/modules/company-profile/components/profile-form";

export default async function AdminServicesPage() {
  return <ProfileForm profile={await getProfile()} section="services" />;
}
