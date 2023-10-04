import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/typings/database";

export const supabase = createClient<Database>(
  // Project　URL
  process.env.REACT_APP_SUPABASE_URL!,
  // anon-key
  process.env.REACT_APP_SUPABASE_KEY!
);
