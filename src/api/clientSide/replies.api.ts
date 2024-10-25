"use client";

import { supabase } from "@/supabase/client";
import { Database, Tables } from "@/supabase/database.types";

const getRepliesByRecruitId = async (recruitId: string) => {
  const { data } = await supabase
    .from("replies")
    .select("*, userProfiles!replies_recipientId_fkey(*)")
    .eq("recruitId", recruitId)
    .returns<
      (Tables<"replies"> & {
        userProfiles: Tables<"userProfiles">;
      })[]
    >();
  return data;
};

const createReply = async (
  data: Database["public"]["Tables"]["replies"]["Insert"]
) => {
  const { error } = await supabase.from("replies").insert(data);
  if (error) throw new Error(error.message);
};

const repliesAPI = {
  getRepliesByRecruitId,
  createReply,
};

export default repliesAPI;
