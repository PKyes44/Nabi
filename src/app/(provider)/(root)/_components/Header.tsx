import Page from "@/components/Page/Page";
import Link from "next/link";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="h-16 bg-white fixed top-0 left-0 z-10 w-screen">
      <Page
        width="lg"
        isMain={false}
        className=" h-full flex items-center justify-between"
      >
        <Link href="/" className="text-2xl font-extrabold">
          나비
        </Link>

        <Navigation />
      </Page>
    </header>
  );
}

export default Header;
