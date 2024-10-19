import serverApi from "@/api/serverSide/api";
import { Tables } from "@/supabase/database.types";
import FeedList from "./FeedList";
import ProfileDetails from "./ProfileDetails";

interface ProfileProps {
  profile: Tables<"userProfiles">;
}

async function Profile({ profile }: ProfileProps) {
  const initialFeeds = await serverApi.feeds.getFeedsByUserId(profile.userId);

  if (!profile) return <span>데이터가 없습니다</span>;

  return (
    <div className="flex flex-col gap-y-5 w-[900px] ">
      <ProfileDetails profile={profile!} showUserId={profile.userId} />
      <FeedList userId={profile.userId} initialFeeds={initialFeeds} />
    </div>
  );
}

export default Profile;
