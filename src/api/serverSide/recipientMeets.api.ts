import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";

const getPendingRecipientAppliesWithProfileByRecruitId = async (
  recruitId: string
) => {
  try {
    const query = "*, userProfiles!recipientMeets_userId_fkey(*)";
    const { data } = await supabase
      .from("recipientMeets")
      .select(query)
      .eq("recruitId", recruitId)
      .eq("status", "pending")
      .returns<
        (Tables<"recipientMeets"> & { userProfiles: Tables<"userProfiles"> })[]
      >();

    if (!data) return [];

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getApprovedRecipientAppliesWithProfileByRecruitId = async (
  recruitId: string
) => {
  try {
    const query = "*, userProfiles!recipientMeets_userId_fkey(*)";
    const { data } = await supabase
      .from("recipientMeets")
      .select(query)
      .eq("recruitId", recruitId)
      .eq("status", "approved")
      .returns<
        (Tables<"recipientMeets"> & { userProfiles: Tables<"userProfiles"> })[]
      >();

    if (!data) return [];
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getRejectedRecipientAppliesWithProfileByRecruitId = async (
  recruitId: string
) => {
  try {
    const query = "*, userProfiles!recipientMeets_userId_fkey(*)";
    const { data } = await supabase
      .from("recipientMeets")
      .select(query)
      .eq("recruitId", recruitId)
      .eq("status", "rejected")
      .returns<
        (Tables<"recipientMeets"> & { userProfiles: Tables<"userProfiles"> })[]
      >();
    if (!data) return [];

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
const recipientMeetsAPI = {
  getPendingRecipientAppliesWithProfileByRecruitId,
  getApprovedRecipientAppliesWithProfileByRecruitId,
  getRejectedRecipientAppliesWithProfileByRecruitId,
};

export default recipientMeetsAPI;
