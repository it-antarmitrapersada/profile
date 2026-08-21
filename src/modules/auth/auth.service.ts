import { createClient } from "@/lib/supabase/server";
import { SignInDto } from "./auth.dto";

export const signIn = async (input: SignInDto) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword(input);
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
