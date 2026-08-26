"use server";

import { redirect } from "next/navigation";
import { userCredentialsSchema } from "../auth.dto";
import { signIn } from "./sign-in.service";

export const signInAction = async (input: unknown) => {
  const parsed = userCredentialsSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  await signIn(parsed.data);

  // /login kini hanya melayani admin konten; "/" adalah beranda publik.
  redirect("/admin");
};
