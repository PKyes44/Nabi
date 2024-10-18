import { Tables } from "@/supabase/database.types";
import ApprovedUser from "./ApprovedUser";
import NotApprovedUser from "./NotApprovedUser";

type Recruit = Tables<"recruits"> & {
  sponsorMeets: (Pick<Tables<"sponsorMeets">, "userId" | "status"> & {
    userProfiles: Tables<"userProfiles"> | null;
  })[];
  recipientMeets: (Pick<Tables<"recipientMeets">, "userId" | "status"> & {
    userProfiles: Tables<"userProfiles"> | null;
  })[];
};

interface RecipientListProps {
  recruit: Recruit;
  profile: Tables<"userProfiles">;
}

function RecipientList({ recruit, profile }: RecipientListProps) {
  function applicantCount(recruit: Recruit) {
    return recruit.recipientMeets.filter((user) => user.status === "approved")
      .length;
  }

  return (
    <section>
      <strong className="font-medium">
        신청한 아동 목록(
        {applicantCount(recruit)}/{recruit.maxRecipientRecruits})
      </strong>

      <ul className="mt-2 flex flex-col gap-y-3">
        {/* 승인된 유저는 언제나 보여주기 */}
        <ApprovedUser meets={recruit.recipientMeets} />

        {/* 인원이 다 차지 않았으면 신청자 보여주기 */}
        {recruit.maxRecipientRecruits > applicantCount(recruit) && (
          <NotApprovedUser
            meets={recruit.recipientMeets}
            profile={profile}
            recruitId={recruit.recruitId}
          ></NotApprovedUser>
        )}
      </ul>
    </section>
  );
}

export default RecipientList;
