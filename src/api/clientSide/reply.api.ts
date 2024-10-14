import { supabase } from "@/supabase/client";

const getRepliesByRecruitId = async (recruitId: string) => {
  const response = await supabase
    .from("replies")
    .select("*")
    .eq("recruitId", recruitId);
  const replies = response.data;

  return replies;
};

const replyAPI = { getRepliesByRecruitId };

export default replyAPI;
