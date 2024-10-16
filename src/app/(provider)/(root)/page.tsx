import clientApi from "@/api/clientSide/api";
import Page from "@/components/Page/Page";
import FreeMeals from "./_components/HomePages/FreeMeals";
import CreateRecruitButton from "./_components/HomePages/Recruits/CreateRecruitButton";
import RecruitList from "./_components/HomePages/Recruits/RecruitList";
import Users from "./_components/HomePages/Users/Users";

export const revalidate = 0;

interface HomePageProps {
  searchParams: { page: string };
}

async function HomePage({ searchParams: { page } }: HomePageProps) {
  const initialRecruits =
    (await clientApi.recruits.getInfiniteRecruits(0)) || null;

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
          <RecruitList initialRecruits={initialRecruits} />
        </div>
        <Users page={page} />
      </div>
    </Page>
  );
}

export default HomePage;
