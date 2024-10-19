import { Tables } from "@/supabase/database.types";

export type FreeMealItem = Tables<"freeMeals"> & {
  storeDatas: Tables<"storeDatas">;
} & {
  userProfiles: Tables<"userProfiles">;
};
