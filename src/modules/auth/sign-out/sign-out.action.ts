"use server";

import { signOut } from "./sign-out.service";

export const signOutAction = async () => {
  await signOut();
};
