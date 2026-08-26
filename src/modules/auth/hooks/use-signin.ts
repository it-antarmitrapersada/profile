"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInAction } from "../sign-in/sign-in.action";

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signInAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Sign-in failed:", error);
    },
  });
};
