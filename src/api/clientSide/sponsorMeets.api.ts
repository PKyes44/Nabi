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

const getRecentlySponsors = async (userId: string) => {
  const { data: recruitIds } = await supabase
    .from("recipientMeets")
    .select("recruitId")
    .eq("userId", userId)
    .eq("status", "approved");

  if (recruitIds) {
    const { data: sponRelationship } = await supabase
      .from("sponsorMeets")
      .select("userId, userProfiles(nickname)")
      .in(
        "recruitId",
        recruitIds.map((data) => data.recruitId)
      )
      .eq("status", "approved")
      .order("createdAt", { ascending: false })
      .limit(5);
    if (!sponRelationship) return;
    return sponRelationship;
  }
};

const approvedUser = async (
  userId: string,
  recruitId: string,
  role: string
) => {
  await supabase
    .from(role === "sponsor" ? "sponsorMeets" : "recipientMeets")
    .update({ status: "approved" })
    .eq("userId", userId)
    .eq("recruitId", recruitId);
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

const sponsorMeetsAPI = {
  getRecruitIdByUserId,
  getRecentlySponsors,
  approvedUser,
  getRecipientByUserId,
  insertSponsorMeet,
};

export default sponsorMeetsAPI;
