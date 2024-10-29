"use client";

import { Tables } from "@/supabase/database.types";
import { CurrentUser } from "@/zustand/auth.store";
import ApplyToRecipientButton from "./ApplyToRecipientButton";
import ApplyToSponsorButton from "./ApplyToSponsorButton";

interface ApplyButtonsProps {
  recruit: Tables<"recruits"> & { userProfiles: Tables<"userProfiles"> };
  user: CurrentUser;
}
function ApplyButtons({ recruit, user }: ApplyButtonsProps) {
  return user.role === "recipient" ? (
    <ApplyToRecipientButton recruit={recruit} authorId={recruit.authorId} />
  ) : (
    <ApplyToSponsorButton recruit={recruit} authorId={recruit.authorId} />
  );
}

export default ApplyButtons;
