"use client";

import { useMutation } from "@tanstack/react-query";
import { updateProfileAction } from "../update-profile/update-profile.action";

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfileAction,
    onError: (error) => {
      console.error("Update profile failed:", error);
    },
  });
