import ProfileItem from "@/components/ProfileItem/ProfileItem";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";

interface RecentSponsorsListProps {
  recentlySponsors?: WithProfiles<Tables<"recipientMeets">>[];
}

function RecentSponsorsList({ recentlySponsors }: RecentSponsorsListProps) {
  return (
    <section className="text-center sm:text-xs only:col-span-2 h-42 bg-white rounded-lg shadow-md py-4 px-7">
      <h3 className="mb-4 font-bold">최근 후원자</h3>
      <ul className="px-9">
        {recentlySponsors?.length !== 0 ? (
          recentlySponsors?.map((recentlySponsor, idx) => {
            const sponsorProfiles = recentlySponsor.userProfiles;
            return (
              <li key={idx} className="">
                <ProfileItem
                  className="m-auto"
                  nickname={sponsorProfiles.nickname}
                  userId={sponsorProfiles.userId}
                  profileImageUrl={sponsorProfiles.profileImageUrl}
                />
              </li>
            );
          })
        ) : (
          <li>최근 후원자가 없습니다.</li>
        )}
      </ul>
    </section>
  );
}

export default RecentSponsorsList;
