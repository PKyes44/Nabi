import Page from "@/components/Page/Page";
import Link from "next/link";
import AuthNavigation from "./AuthNavigation";

function Header() {
  return (
    <header className="h-16 bg-white">
      <Page
        width="lg"
        isMain={false}
        className=" h-full flex items-center justify-between"
      >
        <Link href="/" className="text-2xl font-extrabold">
          나비
        </Link>

        <AuthNavigation />
      </Page>
    </header>
  );
}

export default Header;
