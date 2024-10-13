import { supabase } from "@/supabase/client";
import { EditProfileData } from "@/types/profiles.types";

const BUKET_PROFILEIMAGES = "profileImages";
const BUKET_BACKGROUNDIMAGES = "backgroundImages";

const uploadImageToStorage = async (imageData: EditProfileData) => {

  const result:{
    profileImgUrl?: string;
    bgImgUrl?: string
  } = {}

  // 프로필 이미지가 있을 경우 스토리지에 업로드, URL 반환
  if (imageData.profileImg) {
    const {data: profileData, error:profileErr} = await supabase.storage
    .from(BUKET_PROFILEIMAGES)
    .upload(`${imageData.userId}`, imageData.profileImg!, { upsert: true });
    if (profileErr) throw new Error(profileErr.message);
    result.profileImgUrl = profileData.fullPath;
  }

  // 배경 이미지가 있을 경우 스토리지에 업로드, URL 반환
  if (imageData.bgImg) {
    const {data: bgData, error: bgErr} = await supabase.storage
    .from(BUKET_BACKGROUNDIMAGES)
    .upload(`${imageData.userId}`, imageData.bgImg!, { upsert: true });
    if (bgErr) throw new Error(bgErr.message);
    result.bgImgUrl = bgData.fullPath;
  }

  return result
};

const setPrimaryImage = async (userId:string, type:string) => {
  type === "profile" ? await supabase.storage.from(BUKET_PROFILEIMAGES).remove([userId]): await supabase.storage.from(BUKET_BACKGROUNDIMAGES).remove([userId]);
}

const storageAPI = {
  uploadImageToStorage,
  setPrimaryImage
}

export default storageAPI;