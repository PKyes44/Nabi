import { supabase } from "@/supabase/client";
import { TablesInsert } from "@/supabase/database.types";

const activeThumbUpByUserIdAndRecruitId = async (
  insertData: TablesInsert<"recruitThumbUps">
) => {
  const { error } = await supabase.from("recruitThumbUps").insert(insertData);

  if (error) throw new Error(error.message);
};

const inactiveThumbUpByUserIdAndRecruitId = async (
  deleteData: TablesInsert<"recruitThumbUps">
) => {
  const { error } = await supabase
    .from("recruitThumbUps")
    .delete()
    .eq("userId", deleteData.userId)
    .eq("recruitId", deleteData.recruitId);

  if (error) throw new Error(error.message);
};

const getThumbUpCountByRecruitId = async (recruitId: string) => {
  const { count, error } = await supabase
    .from("recruitThumbUps")
    .select("*", { count: "exact", head: true })
    .eq("recruitId", recruitId);

  if (error) throw new Error(error.message);

  return count;
};

const checkIsActivedThumbUpByUserIdAndRecruitId = async ({
  userId,
  recruitId,
}: {
  userId: string | undefined;
  recruitId: string;
}) => {
  if (!userId) return false;

  const { count, error } = await supabase
    .from("recruitThumbUps")
    .select("*", { count: "exact", head: true })
    .eq("userId", userId)
    .eq("recruitId", recruitId);
  if (error) throw new Error(error.message);

  if (!count || count === 0) return false;

  return true;
};

const thumbUpAPI = {
  getThumbUpCountByRecruitId,
  activeThumbUpByUserIdAndRecruitId,
  inactiveThumbUpByUserIdAndRecruitId,
  checkIsActivedThumbUpByUserIdAndRecruitId,
};

export default thumbUpAPI;
