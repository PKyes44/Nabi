import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";

const getRepliesByRecruitId = async (recruitId: string) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};

const repliesAPI = {
  getRepliesByRecruitId,
};

export default repliesAPI;
