import { PropsWithChildren } from "react";
import Header from "./_components/Headers/Header/Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-[#f5f5f5]">
      <Header />
      {children}
    </div>
  );
}

export default RootLayout;
