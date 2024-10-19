import { supabase } from "@/supabase/client";
import { Database, Tables } from "@/supabase/database.types";

const getRecentlySponsors = async (userId: string) => {
  const query =
    "recruitId, recruits!inner(recruitId, sponsorMeets!inner(status, userId, userProfiles!inner(nickname)))";
  const { data: recentlySponsorsData, error } = await supabase
    .from("recipientMeets")
    .select(query)
    .eq("userId", userId)
    .eq("status", "approved")
    .eq("recruits.sponsorMeets.status", "approved")
    .order("createdAt", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  const sponsors = recentlySponsorsData
    .flatMap((recruitsData) => recruitsData.recruits)
    .map((sponsorsData) => sponsorsData.sponsorMeets);
  return sponsors[0];
};

const approveRecipient = async (userId: string, recruitId: string) => {
  await supabase
    .from("recipientMeets")
    .update({ status: "approved" })
    .eq("userId", userId)
    .eq("recruitId", recruitId);
};

const insertRecipientMeet = async (
  data: Database["public"]["Tables"]["recipientMeets"]["Insert"]
) => {
  const { error } = await supabase.from("recipientMeets").insert(data);

  if (error) {
    throw new Error(error.message);
  }
};

const getRecipientMeets = async () => {
  const { data: recipientMeets } = await supabase
    .from("recipientMeets")
    .select("*");

  return recipientMeets;
};

const getRecipientByRecruitId = async (recruitId: string) => {
  const { data: recipient } = await supabase
    .from("sponsorMeets")
    .select("userId, userProfiles(*)")
    .eq("recruitId", recruitId)
    .eq("status", "approved")
    .returns<{
      userId: string;
      userProfiles: Tables<"userProfiles">;
    } | null>();

  return recipient;
};

const recipientsMeetsAPI = {
  getRecipientMeets,
  insertRecipientMeet,
  getRecentlySponsors,
  approveRecipient,
  getRecipientByRecruitId,
};

export default recipientsMeetsAPI;
