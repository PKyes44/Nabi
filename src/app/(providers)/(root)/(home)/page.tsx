import serverApi from "@/api/serverSide/api";
import Container from "@/components/Container/Container";
import FreeMeals from "./_components/FreeMeals/FreeMeals";
import CreateRecruitButton from "./_components/Recruits/CreateRecruitButton/CreateRecruitButton";
import RecruitList from "./_components/Recruits/RecruitList/RecruitList";
import Users from "./_components/Users/Users";

interface HomePageProps {
  searchParams: {
    page: string;
  };
}

export const revalidate = 0;

async function HomePage({ searchParams: { page } }: HomePageProps) {
  const initialRecruitList = await serverApi.recruits.getGroupOfPageRecruits(
    0,
    5
  );

  let initialFreeMeals = await serverApi.freeMeals.getFreeMealsWithStoreData();

  if (!initialFreeMeals) initialFreeMeals = [];

  return (
    <Container
      width="lg"
      isMain={false}
      className="flex items-center justify-between py-20"
    >
      <div className="grid grid-cols-4 gap-x-5 w-full sm:grid-cols-2 sm:gap-x-2 sm:gap-y-2 md:grid-cols-3">
        {/* Left - FreeMeals*/}
        <div className="sm:order-1 md:order-2">
          <FreeMeals initialFreeMeals={initialFreeMeals} />
        </div>

        {/* Center - Main Feed */}
        <div className="col-span-2 sm:order-3 md:order-1">
          <CreateRecruitButton />
          <RecruitList initialRecruitList={initialRecruitList!} />
        </div>

        {/* Right - Users*/}
        <div className="sm:order-2 md:order-3 md:hidden">
          <Users page={page} />
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
