import Container from "@/components/Container/Container";
import Finances from "./_components/Finances";

function FundReportPage() {
  return (
    <Container width="xs" isMain={false} className="pt-16">
      <Finances />
    </Container>
  );
}

export default FundReportPage;
