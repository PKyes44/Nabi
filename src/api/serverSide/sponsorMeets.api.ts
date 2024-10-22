import { supabase } from "@/supabase/client";
import { Tables } from "@/supabase/database.types";

const getPendingSponsorAppliesWithProfileByRecruitId = async (
  recruitId: string
) => {
  try {
    const query = "*, userProfiles!sponsorMeets_userId_fkey(*)";
    const { data } = await supabase
      .from("sponsorMeets")
      .select(query)
      .eq("recruitId", recruitId)
      .eq("status", "pending")
      .returns<
        (Tables<"sponsorMeets"> & { userProfiles: Tables<"userProfiles"> })[]
      >();
    if (!data) return [];

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getApprovedSponsorAppliesWithProfileByRecruitId = async (
  recruitId: string
) => {
  try {
    const query = "*, userProfiles!sponsorMeets_userId_fkey(*)";
    const { data } = await supabase
      .from("sponsorMeets")
      .select(query)
      .eq("recruitId", recruitId)
      .eq("status", "approved")
      .returns<
        (Tables<"sponsorMeets"> & { userProfiles: Tables<"userProfiles"> })[]
      >();
    if (!data) return [];
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const getRejectedSponsorAppliesWithProfileByRecruitId = async (
  recruitId: string
) => {
  try {
    const query = "*, userProfiles!sponsorMeets_userId_fkey(*)";
    const { data } = await supabase
      .from("sponsorMeets")
      .select(query)
      .eq("recruitId", recruitId)
      .eq("status", "rejected")
      .returns<
        (Tables<"sponsorMeets"> & { userProfiles: Tables<"userProfiles"> })[]
      >();
    if (!data) return [];

    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
};

const sponsorMeetsAPI = {
  getPendingSponsorAppliesWithProfileByRecruitId,
  getApprovedSponsorAppliesWithProfileByRecruitId,
  getRejectedSponsorAppliesWithProfileByRecruitId,
};

export default sponsorMeetsAPI;
