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

const profilesAPI = {
  insertProfile,
};

export default profilesAPI;
