import { PropsWithChildren } from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

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
