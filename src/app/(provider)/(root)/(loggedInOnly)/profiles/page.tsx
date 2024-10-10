import Page from "@/components/Page/Page";
import Profile from "./_components/Profile";

async function ProfilePage() {
  return (
    <Page width="lg" className="mt-10 mb-10">
      <Profile />
    </Page>
  );
}

export default ProfilePage;
