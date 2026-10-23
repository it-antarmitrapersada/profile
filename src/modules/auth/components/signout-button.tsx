"use client";

import { signOutAction } from "../sign-out/sign-out.action";

export const SignOutButton = () => (
  <button
    type="button"
    onClick={() => signOutAction()}
    className="rounded-md px-1 py-1 text-xs text-subtle transition-colors hover:text-foreground"
  >
    Keluar
  </button>
);
