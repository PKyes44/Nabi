import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
if (!KEY) throw new Error("KEY가 없습니다");
if (!URL) throw new Error("URL이 없습니다");

export const supabase = createClient<Database>(URL, KEY);
