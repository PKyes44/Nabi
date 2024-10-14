import { Database } from "@/supabase/database.types";

export type Recruits = Database["public"]["Tables"]["recruits"];
export type UserProfiles = Database["public"]["Tables"]["userProfiles"];
export type FreeMeals = Database["public"]["Tables"]["freeMeals"];
