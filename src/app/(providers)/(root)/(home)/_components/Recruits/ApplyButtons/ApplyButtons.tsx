"use client";

import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import { CurrentUser } from "@/zustand/auth.store";
import ApplyToRecipientButton from "./ApplyToRecipientButton/ApplyToRecipientButton";
import ApplyToSponsorButton from "./ApplyToSponsorButton/ApplyToSponsorButton";

interface ApplyButtonsProps {
  recruit: WithProfiles<Tables<"recruits">>;
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
