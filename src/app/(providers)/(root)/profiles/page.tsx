import Container from "@/components/Container/Container";
import Profile from "./_components/Profile";

interface ProfilePageProps {
  searchParams: {
    userId: string;
  };
}

function ProfilePage({ searchParams: { userId } }: ProfilePageProps) {
  return (
    <Container width="lg" className="my-10 pt-5">
      <Profile userId={userId} />
    </Container>
  );
}

export default ProfilePage;
