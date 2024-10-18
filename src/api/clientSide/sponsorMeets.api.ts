import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";

const getRecruitIdByUserId = async (userId: string) => {
  const response = await supabase
    .from("sponsorMeets")
    .select("recruitId")
    .eq("userId", userId);
  const recruitIds = response.data;
  return recruitIds;
};

const getRecentlySponsorship = async (userId: string, role: string) => {
  const { data: recruitIds } = await supabase
    .from("sponsorMeets")
    .select("recruitId")
    .eq("userId", userId)
    .eq("isApproved", true);

  const { data: sponRelationship } = await supabase
    .from("sponsorMeets")
    .select("userId, userProfiles(nickname)")
    .in(
      "recruitId",
      recruitIds!.map((data) => data.recruitId)
    )
    .eq("isApproved", true)
    .eq("isSponsor", role === "recipient")
    .order("createdAt", { ascending: false })
    .limit(5);

  return sponRelationship;
};

const getRecipientByUserId = async (recruitId: string) => {
  const query = "userId, userProfiles!sponsorMeets_userId_fkey(*)";
  const { data } = await supabase
    .from("sponsorMeets")
    .select(query)
    .eq("recruitId", recruitId)
    .eq("isApproved", true)
    .eq("isSponsor", false)
    .single();
  return data;
};

const insertSponsorMeet = async (
  data: Database["public"]["Tables"]["sponsorMeets"]["Insert"]
) => {
  const { error } = await supabase.from("sponsorMeets").insert(data);

  if (error) {
    throw new Error(error.message);
  }
};

const getSponsorMeets = async () => {
  const response = await supabase.from("sponsorMeets").select("*");
  const recruitIds = response.data;
  return recruitIds;
};

const sponsorMeetsAPI = {
  getRecruitIdByUserId,
  getRecentlySponsorship,
  getRecipientByUserId,
  insertSponsorMeet,
  getSponsorMeets,
};

export default sponsorMeetsAPI;
