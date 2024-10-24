"use client";

import Container from "@/components/Container/Container";
import Business from "./_components/Business";
import Finances from "./_components/Finances";
import ProgressBar from "./_components/ProgressBar";

function FundReportPage() {
  return (
    <Container
      width="xs"
      isMain={false}
      className="pt-16 !overflow-hidden w-screen h-screen"
    >
      <ProgressBar elementId="report" />
      <div id="report" className="w-full h-full overflow-auto">
        <Finances />
        <Business />
      </div>
    </Container>
  );
}

export default FundReportPage;
