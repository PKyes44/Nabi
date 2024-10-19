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
  const query =
    "recruitId, recruits!inner(recruitId, recipientMeets!inner(userId, userProfiles!inner(nickname)))";
  const { data: recentlyRecipientsData, error } = await supabase
    .from("sponsorMeets")
    .select(query)
    .eq("userId", userId)
    .eq("status", "approved")
    .order("createdAt", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  const recipients = recentlyRecipientsData
    .flatMap((recruitsData) => recruitsData.recruits)
    .map((recipientData) => recipientData?.recipientMeets);
  return recipients[0];
};

const approveSponsor = async (userId: string, recruitId: string) => {
  await supabase
    .from("sponsorMeets")
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

const getSponsorMeets = async () => {
  const { data } = await supabase.from("sponsorMeets").select("*");

  return data;
};

const sponsorMeetsAPI = {
  getRecruitIdByUserId,
  getRecentlyRecipients,
  approveSponsor,
  getRecipientByUserId,
  insertSponsorMeet,
  getSponsorMeets,
};

export default sponsorMeetsAPI;
