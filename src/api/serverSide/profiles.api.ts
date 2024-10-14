import { supabase } from "@/supabase/client";

const TABLE_PROFILES = "userProfiles";

const getProfileByUserId = async (userId: string) => {
  try {
    const response = await supabase
      .from(TABLE_PROFILES)
      .select()
      .eq("userId", userId)
      .single();

    const user = response.data;
    return user;
  } catch (e) {
    console.log(e);
  }
};

const profilesAPI = {
  getProfileByUserId,
};
export default profilesAPI;
