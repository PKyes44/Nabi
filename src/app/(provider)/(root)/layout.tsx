import { PropsWithChildren } from "react";
import Footer from "./_components/Footer";
import Header from "./_components/Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default RootLayout;
