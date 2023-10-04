import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/typings/database";

export const supabase = createClient<Database>(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_KEY!
);
