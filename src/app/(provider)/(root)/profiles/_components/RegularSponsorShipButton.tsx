"use client";
import Button from "@/components/Button/Button";
import { useRegularSponsorShipModalStore } from "@/zustand/modals/regularSponsorshipModal.store";

function RegularSponsorShipButton() {
  const setIsRegularSponsorShipModal = useRegularSponsorShipModalStore(
    (state) => state.setIsRegularSponsorShipModal
  );

  const handleClickRegularSponsorShip = () => {
    setIsRegularSponsorShipModal(true);
  };

  return (
    <Button
      intent="primary"
      textIntent="primary"
      onClick={handleClickRegularSponsorShip}
      className="px-5 py-1.5 rounded-sm text-base font-bold"
    >
      정기 후원
    </Button>
  );
}

export default RegularSponsorShipButton;
