import { Tables } from "@/supabase/database.types";
import ApprovedUser from "./ApprovedUser";
import NotApprovedUser from "./NotApprovedUser";

interface SponsorListProps {
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

function SponsorList({ recruit, profile }: SponsorListProps) {
  return (
    <section>
      <strong className="font-medium">
        신청한 후원자 목록 (
        {
          recruit.sponsorMeets.filter((user) => user.status === "approved")
            .length
        }
        /{recruit.maxSponsorRecruits})
      </strong>

      <ul className="flex flex-col gap-y-3 ">
        {/* 승인된 유저는 언제나 보여주기 */}
        {recruit.sponsorMeets
          .filter((user) => user.status === "approved")
          .map((user) => (
            <li key={user.userId}>
              <ApprovedUser user={user} />
            </li>
          ))}

        {/* 인원이 다 차지 않았으면 신청자 보여주기 */}
        {recruit.maxSponsorRecruits >
          recruit.sponsorMeets.filter((user) => user.status === "approved")
            .length &&
          recruit.sponsorMeets
            .filter((user) => user.status === "pending")
            .map((user) => (
              <li key={user.userId}>
                <NotApprovedUser
                  profile={profile}
                  recruitId={recruit.recruitId}
                  user={user}
                />
              </li>
            ))}
      </ul>
    </section>
  );
}

export default SponsorList;
