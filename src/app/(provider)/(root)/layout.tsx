import { PropsWithChildren } from "react";
import Footer from "./_components/Headers/Footer";
import Header from "./_components/Headers/Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="bg-gray-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default RootLayout;
