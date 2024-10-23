import { PropsWithChildren } from "react";
import ReportHeader from "./_components/ReportHeader";

function ReportLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ReportHeader />
      {children}
    </>
  );
}

export default ReportLayout;
