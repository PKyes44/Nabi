import { createClient } from "@supabase/supabase-js";

const URL = "https://gxoibjaejbmathfpztjt.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!KEY) throw new Error("key가 없음");

export const supabase = createClient(URL, KEY);
