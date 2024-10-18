import { supabase } from "@/supabase/client";

const getRecentlyRecipient = async (userId: string) => {
  const { data: recruitIds } = await supabase
    .from("sponsorMeets")
    .select("recruitId")
    .eq("userId", userId)
    .eq("status", "approved");

  if (recruitIds) {
    const { data: sponRelationship } = await supabase
      .from("recipientMeets")
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

const recipientsMeetsAPI = { getRecentlyRecipient };

export default recipientsMeetsAPI;
