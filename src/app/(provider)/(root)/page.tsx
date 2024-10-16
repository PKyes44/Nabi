import Page from "@/components/Page/Page";
import FreeMeals from "./_components/HomePages/FreeMeals";
import CreateRecruitButton from "./_components/HomePages/Recruits/CreateRecruitButton";
import RecruitList from "./_components/HomePages/Recruits/RecruitList";
import Users from "./_components/HomePages/Users/Users";

interface HomePageProps {
  searchParams: { page: string };
}

function HomePage({ searchParams: { page } }: HomePageProps) {
  return (
    <Page
      width="lg"
      isMain={false}
      className="h-full flex items-center justify-between py-20"
    >
      <div className="grid grid-cols-4 gap-x-5 w-full">
        <FreeMeals />
        <div className="col-span-2">
          <CreateRecruitButton />
          <RecruitList />
        </div>
        <Users page={page} />
      </div>
    </Page>
  );
}

export default HomePage;
