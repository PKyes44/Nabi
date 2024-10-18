import { supabase } from "@/supabase/client";

const getRecentlySponsors = async (userId: string) => {
  const { data: recentlyRecipientsData, error } = await supabase
    .from("recipientMeets")
    .select(
      "recruitId, recruits!inner(recruitId, sponsorMeets!inner(status, userId, userProfiles!inner(nickname)))"
    )
    .eq("userId", userId)
    .eq("status", "approved")
    .eq("recruits.sponsorMeets.status", "approved")
    .order("createdAt", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  const a = recentlyRecipientsData
    .map((el) => el.recruits)
    .map((el) => el?.sponsorMeets);
  return a[0];
};

const recipientsMeetsAPI = { getRecentlySponsors };

export default recipientsMeetsAPI;
