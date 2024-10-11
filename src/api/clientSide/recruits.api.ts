import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";

async function createRecruit(
  data: Database["public"]["Tables"]["recruits"]["Insert"]
) {
  const { data: recruitData, error } = await supabase
    .from("recruits")
    .insert(data);
  if (error) throw new Error(error.message);

  return recruitData;
}

async function getRecruits() {
  const response = await supabase.from("recruits").select("*");
  const data = response.data;

  return data;
}

const getRecruit = async (recruitId: string) => {
  const response = await supabase
    .from("recruits")
    .select("*")
    .eq("recruitId", recruitId)
    .single();
  const recruit = response.data;

  return recruit as Database["public"]["Tables"]["recruits"]["Row"];
};

const getSortedMyRecruits = async (userId: string) => {
  const response = await supabase
    .from("recruits")
    .select("*")
    .eq("authorId", userId)
    .order("createdAt", { ascending: false })
    .limit(5);

  return response;
};

const recruitsAPI = {
  createRecruit,
  getSortedMyRecruits,
  getRecruits,
  getRecruit,
};

export default recruitsAPI;
