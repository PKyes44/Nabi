import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";

const TABLE_PROFILES = "userProfiles";

const insertProfile = async (
  insertProfileData: Database["public"]["Tables"]["userProfiles"]["Insert"]
) => {
  const { data, error } = await supabase
    .from(TABLE_PROFILES)
    .insert(insertProfileData);

  if (error) throw new Error(error.message);

  return data;
};

const getProfileByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from(TABLE_PROFILES)
    .select()
    .eq("userId", userId)
    .single();

  if (error) throw new Error(error.message);
  const profile: Database["public"]["Tables"]["userProfiles"]["Row"] = data;
  return profile;
};

const profilesAPI = {
  insertProfile,
  getProfileByUserId,
};

export default profilesAPI;
