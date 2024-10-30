import clientApi from "@/api/clientSide/api";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import { useAuthStore } from "@/zustand/auth.store";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type RecruitDetailsHookProps = WithProfiles<Tables<"recruits">>;

function useRecruitDetails(recruit: RecruitDetailsHookProps) {
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);
  const currentUser = useAuthStore((state) => state.currentUser);
  const createdAt = dayjs(recruit.createdAt).fromNow();
  const isPassedDeadLineDate = dayjs().isBefore(recruit.deadLineDate);
  const remainDeadLineDate = dayjs(recruit.deadLineDate).toNow();

  const { data: approvedRecipients } = useQuery({
    queryKey: ["recruits", { recruit: "recipients" }],
    queryFn: () =>
      clientApi.recipientMeets.getRecipientByRecruitId(recruit.recruitId),
    enabled: currentUser?.role === "recipient",
  });

  const { data: approvedSponsors } = useQuery({
    queryKey: ["recruits", { recruit: "sponsors" }],
    queryFn: () =>
      clientApi.sponsorMeets.getApprovedSponsorsByRecruitId(recruit.recruitId),
    enabled: currentUser?.role === "sponsor",
  });

  return {
    isAuthInitialized,
    currentUser,
    createdAt,
    isPassedDeadLineDate,
    remainDeadLineDate,
    approvedRecipients,
    approvedSponsors,
  };
}

export default useRecruitDetails;
