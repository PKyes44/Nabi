import serverApi from "@/api/serverSide/api";
import Container from "@/components/Container/Container";
import FeedList from "./_components/FeedList";
import ProfileDetails from "./_components/ProfileDetails";
import ProfileSideBar from "./_components/SideBar/ProfileSideBar";

interface ProfilePageProps {
  searchParams: {
    userId: string;
  };
}

async function ProfilePage({ searchParams: { userId } }: ProfilePageProps) {
  const profile = await serverApi.profiles.getProfileByUserId(userId!);
  const initialFeeds = await serverApi.feeds.getFeedsByUserId(profile.userId);

  if (!profile) return <span>데이터가 없습니다</span>;

  return (
    <Container width="lg" className="my-10 py-5">
      <div className="grid grid-cols-4 w-full gap-x-3 sm:grid-cols-1">
        <section className="flex flex-col col-span-3 w-full gap-y-3">
          <ProfileDetails
            initialProfile={profile!}
            showUserId={profile.userId}
          />
          <div className="hidden sm:block">
            <ProfileSideBar profile={profile!} />
          </div>
          <FeedList userId={profile.userId} initialFeeds={initialFeeds} />
        </section>
        <div className="sm:hidden">
          <ProfileSideBar profile={profile!} />
        </div>
      </div>
    </Container>
  );
}

export default ProfilePage;
