"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

/** Server action admin + toast sukses/gagal lewat Sonner. */
export const useAdminMutation = <TInput>(
  action: (input: TInput) => Promise<void>,
  successMessage?: string,
) =>
  useMutation({
    mutationFn: action,
    onSuccess: () => successMessage && toast.success(successMessage),
    onError: (error) => toast.error(error.message || "Gagal menyimpan"),
  });
