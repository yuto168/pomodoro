import { createClient } from "@supabase/supabase-js";
import type { Database } from "src/typings/database";

export const supabase = createClient<Database>(
  // process.env.REACT_APP_SUPABASE_URL!,
  // process.env.REACT_APP_SUPABASE_KEY!
  "https://pydzqipvxuprutsuduyc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5ZHpxaXB2eHVwcnV0c3VkdXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk3NDc2OTUsImV4cCI6MTk5NTMyMzY5NX0.cODFuCZk9wPvtdEmILBNqfgBMfaI6grnAe76HCbR9g4"
);
