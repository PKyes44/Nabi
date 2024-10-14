import Page from "@/components/Page/Page";
import Profile from "./_components/Profile";

interface ProfilePageProps {
  searchParams: {
    userId: string;
  };
}

function ProfilePage({ searchParams }: ProfilePageProps) {
  return (
    <Page width="lg" className="my-10 ">
      <Profile userId={searchParams.userId} />
    </Page>
  );
}

export default ProfilePage;
