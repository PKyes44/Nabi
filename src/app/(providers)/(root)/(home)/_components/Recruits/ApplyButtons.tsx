"use client";

import { Tables } from "@/supabase/database.types";
import { useAuthStore } from "@/zustand/auth.store";
import ApplyToRecipientButton from "./ApplyToRecipientButton";
import ApplyToSponsorButton from "./ApplyToSponsorButton";

interface ApplyButtonsProps {
  recruit: Tables<"recruits"> & { userProfiles: Tables<"userProfiles"> };
}
function ApplyButtons({ recruit }: ApplyButtonsProps) {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (!currentUser)
    return <div className="w-[165px] h-8 bg-gray-200 ml-auto" />;

  return currentUser.role === "recipient" ? (
    <ApplyToRecipientButton
      recruitId={recruit.recruitId}
      authorId={recruit.authorId}
    />
  ) : (
    <ApplyToSponsorButton
      recruitId={recruit.recruitId}
      authorId={recruit.authorId}
    />
  );
}

export default ApplyButtons;
