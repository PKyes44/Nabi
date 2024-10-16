import Page from "@/components/Page/Page";
import Link from "next/link";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="h-16 bg-white fixed top-0 left-0 z-[2] w-screen">
      <Page
        width="lg"
        isMain={false}
        className="h-full flex items-center justify-between"
      >
        <Link href="/" className="text-2xl font-extrabold">
          <img
            src="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/NabiLogo.png?t=2024-10-16T06%3A12%3A04.231Z"
            className="w-14"
            alt="nabi logo"
          />
        </Link>

        <Navigation />
      </Page>
    </header>
  );
}

export default Header;
