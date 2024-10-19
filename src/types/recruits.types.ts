import { Tables } from "@/supabase/database.types";

export type RecruitItem = Tables<"recruits"> & {
  userProfiles: Tables<"userProfiles">;
} & {
  replies: (Tables<"replies"> & {
    userProfiles: Tables<"userProfiles">;
  })[];
};
