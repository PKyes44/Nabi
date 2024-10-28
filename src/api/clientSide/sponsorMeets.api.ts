import { supabase } from "@/supabase/client";
import { Database, Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";

const getRecruitIdByUserId = async (userId: string) => {
  const { data: recruitIds } = await supabase
    .from("sponsorMeets")
    .select("recruitId")
    .eq("userId", userId);

  return recruitIds;
};

const getRecentlyRecipients = async (sponsorId: string) => {
  const query = `
  *,
  recruits!sponsorMeets_recruitId_fkey(
    *,
    recipientMeets(
        *, userProfiles(*)
      )
  )`;

  const { data: recentlyRecipientsData, error } = await supabase
    .from("sponsorMeets")
    .select(query)
    .eq("userId", sponsorId)
    .eq("status", "approved")
    .order("createdAt", { ascending: false })
    .limit(5)
    .returns<
      (Tables<"sponsorMeets"> & {
        recruits: Tables<"recruits"> & {
          recipientMeets: WithProfiles<Tables<"recipientMeets">>[];
        };
      })[]
    >();

  if (error) throw new Error(error.message);

  return recentlyRecipientsData;
};

const approveSponsor = async (userId: string, recruitId: string) => {
  await supabase
    .from("sponsorMeets")
    .update({ status: "approved" })
    .eq("userId", userId)
    .eq("recruitId", recruitId);
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

const rejectSponsor = async (userId: string, recruitId: string) => {
  await supabase
    .from("sponsorMeets")
    .update({ status: "rejected" })
    .eq("userId", userId)
    .eq("recruitId", recruitId);
};

const getPendingSponsorAppliesWithProfileByRecruitId = async (
  recruitId: string
) => {
  const query = "*, userProfiles!sponsorMeets_userId_fkey(*)";

  const { data, error } = await supabase
    .from("sponsorMeets")
    .select(query)
    .eq("recruitId", recruitId)
    .eq("status", "pending")
    .returns<WithProfiles<Tables<"sponsorMeets">>[]>();

  if (error) throw new Error(error.message);

  return data;
};

const getApprovedSponsorAppliesWithProfileByRecruitIdAndUserId = async (
  recruitId: string,
  userId: string
) => {
  const query = "*, userProfiles!sponsorMeets_userId_fkey(*)";

  const { data, error } = await supabase
    .from("sponsorMeets")
    .select(query)
    .eq("recruitId", recruitId)
    .eq("status", "approved")
    .neq("userId", userId)
    .returns<WithProfiles<Tables<"sponsorMeets">>[]>();

  if (error) throw new Error(error.message);

  return data;
};

const getRejectedSponsorAppliesWithProfileByRecruitId = async (
  recruitId: string
) => {
  const query = "*, userProfiles!sponsorMeets_userId_fkey(*)";

  const { data, error } = await supabase
    .from("sponsorMeets")
    .select(query)
    .eq("recruitId", recruitId)
    .eq("status", "rejected")
    .returns<WithProfiles<Tables<"sponsorMeets">>[]>();

  if (error) throw new Error(error.message);

  return data;
};

const getApprovedSponsorsByRecruitId = async (recruitId: string) => {
  const { data: sponsors, error } = await supabase
    .from("sponsorMeets")
    .select("userId, userProfiles(*)")
    .eq("recruitId", recruitId)
    .eq("status", "approved")
    .returns<
      {
        userId: string;
        userProfiles: Tables<"userProfiles">;
      }[]
    >();
  if (error) throw new Error(error.message);

  return sponsors;
};

const sponsorMeetsAPI = {
  getRecruitIdByUserId,
  getRecentlyRecipients,
  approveSponsor,
  insertSponsorMeet,
  getSponsorMeets,
  rejectSponsor,
  getPendingSponsorAppliesWithProfileByRecruitId,
  getApprovedSponsorAppliesWithProfileByRecruitIdAndUserId,
  getRejectedSponsorAppliesWithProfileByRecruitId,
  getApprovedSponsorsByRecruitId,
};

export default sponsorMeetsAPI;
