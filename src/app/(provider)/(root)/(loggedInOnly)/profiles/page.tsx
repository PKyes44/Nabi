import Page from "@/components/Page/Page";
import Profile from "./_components/Profile";

interface ProfilePageProps {
  searchParams: {
    userId: string;
  };
}

function ProfilePage({ searchParams: { userId } }: ProfilePageProps) {
  return (
    <Page width="lg" className="my-10 pt-5">
      <Profile userId={userId} />
    </Page>
  );
}

export default ProfilePage;
