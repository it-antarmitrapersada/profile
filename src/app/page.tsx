import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/modules/auth/components/signout-button";
import { signOutAction } from "@/modules/auth/sign-out/sign-out.action";

export default function Home() {
  return (
    <div>
      Home Page
      <SignOutButton />
    </div>
  );
}
