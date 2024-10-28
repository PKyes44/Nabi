import ProfileItem from "@/components/ProfileItem/ProfileItem";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import RecentlyRecipientsSkeleton from "./RecentlyRecipientsSkeleton";

interface RecentRecipientsListtProps {
  recentlyRecipients?: WithProfiles<Tables<"sponsorMeets">>[];
}

function RecentRecipientsList({
  recentlyRecipients,
}: RecentRecipientsListtProps) {
  return (
    <div className="bg-white rounded-lg shadow-md py-4 px-5">
      <h3 className="mb-4 font-bold">이 후원자가 최근에 후원한 아이들</h3>
      <ul className="flex flex-col gap-y-2 pl-9">
        {recentlyRecipients ? (
          recentlyRecipients.map((recentlyRecipient, idx) => {
            const recipientProfiles = recentlyRecipient.userProfiles;
            return (
              <li key={idx} className="">
                <ProfileItem
                  className="m-auto"
                  nickname={recipientProfiles.nickname}
                  userId={recipientProfiles.userId}
                  profileImageUrl={recipientProfiles.profileImageUrl}
                />
              </li>
            );
          })
        ) : (
          <RecentlyRecipientsSkeleton />
        )}
      </ul>
    </div>
  );
}

export default RecentRecipientsList;
