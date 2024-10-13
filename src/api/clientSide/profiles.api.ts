import { supabase } from "@/supabase/client";
import { Database } from "@/supabase/database.types";
import { EditProfileData } from "@/types/profiles.types";
import clientApi from "./api";

const TABLE_PROFILES = "userProfiles";
const baseURL = "https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/"

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
  if (!userId) return;

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

  // 닉네임 변경
  if (editProfileData.nickname) await supabase
        .from(TABLE_PROFILES)
        .update({nickname: editProfileData.nickname})
        .eq("userId", editProfileData.userId);

  // 프로필, 배경 이미지 스토리지에 업로드
  const imageUploadData = {
    userId: editProfileData.userId,
    profileImg: editProfileData.profileImg,
    bgImg: editProfileData.bgImg,
  }
  const result = await clientApi.storage.uploadImageToStorage(imageUploadData);

  // 프로필 이미가가 바꼈을 경우 프로필 이미지 URL 변경
  if (result.profileImgUrl) {
    await supabase.from(TABLE_PROFILES).update({
      profileImageUrl: baseURL + result.profileImgUrl
    }).eq("userId", editProfileData.userId);
  }

  // 배경 이미지가 바꼈을 경우 배경 이미지 URL 변경
  if (result.bgImgUrl) {
    await supabase.from(TABLE_PROFILES).update({
      bgImageUrl: baseURL + result.bgImgUrl
    }).eq("userId", editProfileData.userId);
  }
}

const setPrimaryImage = async (userId:string, type:string) => {
  type === "profile" ? await supabase.from(TABLE_PROFILES).update({profileImageUrl: null}).eq("userId", userId):
  await supabase.from(TABLE_PROFILES).update({bgImageUrl: null}).eq("userId", userId);
  clientApi.storage.setPrimaryImage(userId, type)
}

const profilesAPI = {
  insertProfile,
  getProfileByUserId,
  editProfile,
  setPrimaryImage,
};

export default profilesAPI;
