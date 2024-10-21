import { supabase } from "@/supabase/client";
import { Database, Tables } from "@/supabase/database.types";

const getRecruitIdByUserId = async (userId: string) => {
  const response = await supabase
    .from("sponsorMeets")
    .select("recruitId")
    .eq("userId", userId);
  const recruitIds = response.data;
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
      Tables<"sponsorMeets"> &
        {
          recruits: Tables<"recruits"> & {
            recipientMeets: Tables<"recipientMeets"> &
              {
                userProfiles: Tables<"userProfiles">;
              }[];
          };
        }[]
    >();

  if (error) throw new Error(error.message);

  // const recipients = recentlyRecipientsData
  //   .flatMap((recruitsData) => recruitsData.recruits)
  //   .map((recipientData) => recipientData?.recipientMeets);

  console.log("recentlyRecipientsData: ", recentlyRecipientsData);
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

const sponsorMeetsAPI = {
  getRecruitIdByUserId,
  getRecentlyRecipients,
  approveSponsor,
  insertSponsorMeet,
  getSponsorMeets,
};

export default sponsorMeetsAPI;
