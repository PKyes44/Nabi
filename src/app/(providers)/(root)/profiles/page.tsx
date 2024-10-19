import serverApi from "@/api/serverSide/api";
import Container from "@/components/Container/Container";
import Profile from "./_components/Profile";
import ProfileSideBar from "./_components/SideBar/ProfileSideBar";

interface ProfilePageProps {
  searchParams: {
    userId: string;
  };
}

async function ProfilePage({ searchParams: { userId } }: ProfilePageProps) {
  const profile = await serverApi.profiles.getProfileByUserId(userId!);
  return (
    <Container width="lg" className="my-10 pt-5">
      <div className="flex gap-x-7 w-full">
        <Profile profile={profile} />

        <ProfileSideBar profile={profile!} />
      </div>
    </Container>
  );
}

export default ProfilePage;
