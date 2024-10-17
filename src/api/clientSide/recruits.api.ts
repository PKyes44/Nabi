import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";
import { Recruits } from "@/types/customDatabase";

const createRecruit = async (data: Recruits["Insert"]) => {
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

const getRecruit = async (recruitId: string) => {
  const response = await supabase
    .from("recruits")
    .select("*")
    .eq("recruitId", recruitId)
    .single();
  const recruit = response.data;

  return recruit as Recruits["Row"];
};

const getSortedRecruits = async () => {
  const response = await supabase
    .from("recruits")
    .select("*")
    .order("createdAt", { ascending: false });

  const data = response.data;

  return data;
};

const getSortedMyRecruits = async (userId: string) => {
  const response = await supabase
    .from("recruits")
    .select("*, sponsorMeets(isSponsor, userId, isApproved, userProfiles(*))")
    .eq("authorId", userId)
    .order("createdAt", { ascending: false });

  const recruits = response.data;

  return recruits;
};

const editRecruit = async (
  recruitId: string,
  data: Partial<Recruits["Update"]>
) => {
  const { error } = await supabase
    .from("recruits")
    .update(data)
    .eq("recruitId", recruitId);

  if (error) throw new Error(error.message);
};

const getInfiniteRecruitsByUserId = async (page: number, userId: string) => {
  // userId 넣어서 approved가 되어있는 게시글들 불러오기
  const { data: RecruitsData } = await supabase
    .from("sponsorMeets")
    .select("recruits(*)")
    .eq("userId", userId)
    .eq("isApproved", true)
    .order("createdAt", { ascending: false })
    .range(page * 5, page * 5 + 4);

  const recruits = RecruitsData?.map((recruitsAndId) => {
    return recruitsAndId.recruits!;
  });

  return recruits;
};

const getInfiniteRecruits = async (page: number) => {
  const { data } = await supabase
    .from("recruits")
    .select("*")
    .order("createdAt", { ascending: false })
    .range(page * 5, page * 5 + 4);
  return data;
};

const recruitsAPI = {
  createRecruit,
  getSortedMyRecruits,
  getRecruits,
  getRecruit,
  getInfiniteRecruits,
  editRecruit,
  getSortedRecruits,
  getInfiniteRecruitsByUserId,
};

export default recruitsAPI;
