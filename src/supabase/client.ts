import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gxoibjaejbmathfpztjt.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!supabaseKey) throw new Error("supabaseKey가 없음");

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
