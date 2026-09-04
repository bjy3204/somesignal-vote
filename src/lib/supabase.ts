import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://sgxoknuyftlfwqvkxosm.supabase.co";

const supabaseKey =
  "sb_publishable_DpjNRA9bG0Q55bBTWU08RA_KcM5OfHv";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);