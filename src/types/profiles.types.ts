export type Role = "sponsor" | "recipient";

export type EditProfileData = {
  userId: string;
  nickname: string;
  profileImg: File | undefined;
  bgImg: File | undefined;
};