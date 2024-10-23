import Container from "@/components/Container/Container";
import Business from "./_components/Business";
import Finances from "./_components/Finances";

function FundReportPage() {
  return (
    <Container width="xs" isMain={false} className="pt-16">
      <Finances />
      <Business />
    </Container>
  );
}

export default FundReportPage;
