"use server";

import { redirect } from "next/navigation";
import { signOut } from "./sign-out.service";

export const signOutAction = async () => {
  await signOut();
  redirect("/login");
};
