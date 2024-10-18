import Container from "@/components/Container/Container";
import { PropsWithChildren } from "react";
import FreeMeals from "./_components/FreeMeals/FreeMeals";
import Users from "./_components/Users/Users";

interface HomePageLayoutProps {
  page: string;
}

function HomePageLayout({
  children,
  page,
}: PropsWithChildren<HomePageLayoutProps>) {
  return (
    <Container
      width="lg"
      isMain={false}
      className="h-full flex items-center justify-between py-20"
    >
      <div className="grid grid-cols-4 gap-x-5 w-full">
        <FreeMeals />
        <div className="col-span-2">{children}</div>
        <Users page={page} />
      </div>
    </Container>
  );
}

export default HomePageLayout;
