import Page from "@/components/Page/Page";
import Link from "next/link";
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
        <div className="bg-white h-60"></div>
        <div className="col-span-2">
          <Link
            href={"/recruits/new"}
            className="w-full block bg-white text-center py-3 text-[15px]"
          >
            글 작성
          </Link>
          <RecruitList />
        </div>
        <Users page={page} />
      </div>
    </Page>
  );
}

export default HomePage;
