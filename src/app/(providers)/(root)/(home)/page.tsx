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
      <div className="grid grid-cols-4 gap-x-5 w-full sm:grid-cols-1">
        {/* Left - FreeMeals*/}
        <div>
          <FreeMeals initialFreeMeals={initialFreeMeals} />
        </div>

        {/* Center - Main Feed */}
        <div className="col-span-2">
          <CreateRecruitButton />
          <RecruitList initialRecruitList={initialRecruitList!} />
        </div>

        {/* Right - Users*/}
        <ul className="flex flex-col gap-y-5">
          <li>
            <Users page={page} />
          </li>
        </ul>
      </div>
    </Container>
  );
}

export default HomePage;
