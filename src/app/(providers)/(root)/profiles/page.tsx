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
    <Container width="lg" className="my-10 pt-5">
      <div className="flex flex-wrap gap-y-5 w-full">
        <section className="min-w-[150px] flex flex-nowrap md:flex-wrap sm:flex-wrap gap-y-5 gap-x-7 ">
          <ProfileDetails
            initialProfile={profile!}
            showUserId={profile.userId}
          />
          <ProfileSideBar profile={profile!} />
        </section>

        <FeedList userId={profile.userId} initialFeeds={initialFeeds} />
      </div>
    </Container>
  );
}

export default ProfilePage;
