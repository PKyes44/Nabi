import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";
import { EditProfileData } from "@/types/profiles.types";

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


const editProfile = async (editProfileData:EditProfileData) => {
  await supabase
        .from("userProfiles")
        .update({nickname: editProfileData.nickname})
        .eq("userId", editProfileData.userId);

  const {data: profileData} = await supabase.storage
        .from("profileImages")
        .upload(`${editProfileData.userId}`, editProfileData.profileImg!, { upsert: true });
        
  const {data: bgData} = await supabase.storage
        .from("backgroundImages")
        .upload(`${editProfileData.userId}`, editProfileData.bgImg!, { upsert: true });

  const baseURL = "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/"
  await supabase.from("userProfiles").update({
    profileImageUrl: baseURL+profileData!.fullPath,
    bgImageUrl: baseURL+bgData!.fullPath,
  }).eq("userId", editProfileData.userId);

}

const profilesAPI = {
  insertProfile,
  getProfileByUserId,
  editProfile,
};

export default profilesAPI;
