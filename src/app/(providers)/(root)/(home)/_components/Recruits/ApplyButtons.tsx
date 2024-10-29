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

  return currentUser?.role === "recipient" ? (
    <ApplyToRecipientButton recruit={recruit} authorId={recruit.authorId} />
  ) : (
    <ApplyToSponsorButton recruit={recruit} authorId={recruit.authorId} />
  );
}

export default ApplyButtons;
