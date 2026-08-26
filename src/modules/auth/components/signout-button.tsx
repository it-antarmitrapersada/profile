"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "../sign-out/sign-out.action";

export const SignOutButton = () => (
  <Button onClick={() => signOutAction()}>Logout</Button>
);
