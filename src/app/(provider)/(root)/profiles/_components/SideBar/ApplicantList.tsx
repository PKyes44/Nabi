import { Tables } from "@/supabase/database.types";
import RecipientList from "./RecipientList";
import SponsorList from "./SponsorList";

interface ApplicantListProps {
  myRecruits: (Tables<"recruits"> & {
    sponsorMeets: (Pick<Tables<"sponsorMeets">, "userId" | "status"> & {
      userProfiles: Tables<"userProfiles"> | null;
    })[];

    recipientMeets: (Pick<Tables<"recipientMeets">, "userId" | "status"> & {
      userProfiles: Tables<"userProfiles"> | null;
    })[];
  })[];

  profile: Tables<"userProfiles">;
}

function ApplicantList({ myRecruits, profile }: ApplicantListProps) {
  return myRecruits?.map((recruit) => (
    <li
      className="flex flex-col gap-y-2 h-full bg-white py-3 px-2 shadow-md rounded-lg"
      key={recruit.recruitId}
    >
      <h3 className="font-light mx-auto text-center">
        <span className="font-bold">
          {recruit.title.length > 5
            ? recruit.title.slice(0, 5) + "..."
            : recruit.title}
        </span>{" "}
        글의 신청자 목록
      </h3>
      <br />
      <div className="text-center">
        <SponsorList recruit={recruit} profile={profile} />
        <br />
        <RecipientList recruit={recruit} profile={profile} />
      </div>
    </li>
  ));
}

export default ApplicantList;
