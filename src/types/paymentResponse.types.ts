export type PaymentResponse = {
  amount: number;
  approvedAt: string;
  orderName: string;
  orderId: string;
  card: {
    acquireStatus: string;
    acquirerCode: string;
    amount: number;
    approveNo: string;
    cardType: string;
    installmentPlanMonths: number;
    interestPayer: null;
    isInterestfree: boolean;
    issuerCode: string;
    number: string;
    ownerType: string;
    useCardPoint: boolean;
  };
};
