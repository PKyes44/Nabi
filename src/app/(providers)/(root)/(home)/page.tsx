import serverApi from "@/api/serverSide/api";
import CreateRecruitButton from "./_components/Recruits/CreateRecruitButton";
import RecruitList from "./_components/Recruits/RecruitList";

async function HomePage() {
  const initialRecruitList = await serverApi.recruits.getGroupOfPageRecruits(
    0,
    5
  );

  return (
    <>
      <CreateRecruitButton />
      <RecruitList initialRecruitList={initialRecruitList!} userId={null!} />
    </>
  );
}

export default HomePage;
