export type Role = "sponsor" | "recipient";

export type EditProfileData = {
  userId: string;
  nickname?: string;
  profileImg?: File;
  bgImg?: File;
};