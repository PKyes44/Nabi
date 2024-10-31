import ProfileItem from "@/components/ProfileItem/ProfileItem";
import { Tables } from "@/supabase/database.types";
import { WithProfiles } from "@/types/profiles.types";
import RecentlyRecipientsSkeleton from "./RecentlyRecipientsSkeleton";

interface RecentRecipientsListProps {
  recentlyRecipients?: WithProfiles<Tables<"sponsorMeets">>[];
}

function RecentRecipientsList({
  recentlyRecipients,
}: RecentRecipientsListProps) {
  return (
    <div className="text-center bg-white only:col-span-2 rounded-lg shadow-md py-4 px-5 sm:text-xs">
      <h3 className="mb-4 font-bold">최근에 후원한 아이들</h3>
      <ul className="flex flex-col gap-y-2 pl-9 sm:pl-0">
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
