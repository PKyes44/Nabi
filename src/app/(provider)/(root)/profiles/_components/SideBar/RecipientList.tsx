import { Tables } from "@/supabase/database.types";
import ApprovedUser from "./ApprovedUser";
import NotApprovedUser from "./NotApprovedUser";

interface RecipientListProps {
  recruit: Tables<"recruits"> & {
    sponsorMeets: (Pick<Tables<"sponsorMeets">, "userId" | "status"> & {
      userProfiles: Tables<"userProfiles"> | null;
    })[];
    recipientMeets: (Pick<Tables<"recipientMeets">, "userId" | "status"> & {
      userProfiles: Tables<"userProfiles"> | null;
    })[];
  };
  profile: Tables<"userProfiles">;
}

function RecipientList({ recruit, profile }: RecipientListProps) {
  return (
    <section>
      <strong className="font-medium">
        신청한 아동 목록(
        {
          recruit.recipientMeets.filter((user) => user.status === "approved")
            .length
        }
        /{recruit.maxRecipientRecruits})
      </strong>

      <ul className="mt-2 flex flex-col gap-y-3">
        {/* 승인된 유저는 언제나 보여주기 */}
        <ApprovedUser meets={recruit.recipientMeets} />

        {/* 인원이 다 차지 않았으면 신청자 보여주기 */}
        {recruit.maxRecipientRecruits >
          recruit.recipientMeets.filter((user) => user.status === "approved")
            .length && (
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
