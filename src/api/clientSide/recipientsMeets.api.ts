import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";

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
  const { data } = await supabase.from("recipientMeets").select("*");

  return data;
};

const recipientsMeetsAPI = {
  getRecipientMeets,
  insertRecipientMeet,
  getRecentlySponsors,
  approveRecipient,
};

export default recipientsMeetsAPI;
