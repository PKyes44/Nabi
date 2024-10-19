import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";

const getRepliesByRecruitId = async (recruitId: string) => {
  const query = "*, userProfiles!replies_recipientId_fkey(*)";
  try {
    const { data } = await supabase
      .from("replies")
      .select(query)
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
