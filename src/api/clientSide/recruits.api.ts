import { supabase } from "@/supabase/client";
import { Database, Tables } from "@/supabase/database.types";

const createRecruit = async (
  data: Database["public"]["Tables"]["recruits"]["Insert"]
) => {
  const { data: recruitData, error } = await supabase
    .from("recruits")
    .insert(data);
  if (error) throw new Error(error.message);

  return recruitData;
};

const getRecruits = async () => {
  const response = await supabase.from("recruits").select("*");
  const data = response.data;

  return data as Tables<"recruits">[];
};

const getSortedRecruits = async () => {
  const response = await supabase
    .from("recruits")
    .select("*")
    .order("createdAt", { ascending: false });

  const data = response.data;

  return data;
};

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

const editRecruit = async (
  recruitId: string,
  data: Partial<Database["public"]["Tables"]["recruits"]["Update"]>
) => {
  const { error } = await supabase
    .from("recruits")
    .update(data)
    .eq("recruitId", recruitId);

  if (error) throw new Error(error.message);
};

const getPaginatedRecruits = async (userId: string, page: number) => {
  const response = await supabase
    .from("recruits")
    .select("*")
    .eq("authorId", userId)
    .order("createdAt", { ascending: false })
    // 3개씩 보여주기
    .range(page * 3, page * 3 + 2);
  const recruits = response.data;

  return recruits;
};

const recruitsAPI = {
  createRecruit,
  getSortedMyRecruits,
  getRecruits,
  getRecruit,
  editRecruit,
  getPaginatedRecruits,
  getSortedRecruits,
};

export default recruitsAPI;
