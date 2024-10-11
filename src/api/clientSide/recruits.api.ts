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

const getSortedMyRecruits = async (userId: string) => {
  const response = await supabase
    .from("recruits")
    .select("*")
    .eq("authorId", userId)
    .order("createdAt", { ascending: false });
  console.log(response);
  return response;
};

const recruitsAPI = {
  createRecruit,
  getRecruits,
  getMyRecruits: getSortedMyRecruits,
};

export default recruitsAPI;
