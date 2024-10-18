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

const getRecentlyRecipients = async (userId: string) => {
  const { data: recentlyRecipientsData, error } = await supabase
    .from("sponsorMeets")
    .select(
      "recruitId, recruits!inner(recruitId, recipientMeets!inner(userId, userProfiles!inner(nickname)))"
    )
    .eq("userId", userId)
    .eq("status", "approved")
    .order("createdAt", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  const a = recentlyRecipientsData
    .map((el) => el.recruits)
    .map((el) => el?.recipientMeets);
  return a[0];
};

const approveUser = async (userId: string, recruitId: string, role: string) => {
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
  getRecentlyRecipients,
  approveUser,
  getRecipientByUserId,
  insertSponsorMeet,
};

export default sponsorMeetsAPI;
