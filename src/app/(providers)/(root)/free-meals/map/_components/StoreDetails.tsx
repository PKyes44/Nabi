import { Tables } from "@/supabase/database.types";
import StoreDetailButtons from "./StoreDetailButtons";

interface StoreDetailModalProps {
  detailData: Omit<Tables<"storeDatas">, "lng" | "lat"> & {
    isRegisted: boolean;
  };
}

function StoreDetails({ detailData: storeDetailData }: StoreDetailModalProps) {
  return (
    <section className="w-96 sm:w-[300px] h-96 bg-white rounded-lg py-8 px-10 flex flex-col gap-y-5 sm:px-6">
      <div className="bg-gray-400 w-full h-40" />
      <div className="flex flex-col gap-y-5">
        <div>
          <h2 className="font-bold text-2xl whitespace-nowrap sm:text-xl">
            {storeDetailData?.brandName}
          </h2>
          <span className="text-sm">{storeDetailData?.storeType}</span>
          <address className="not-italic text-sm">
            {storeDetailData?.address}
          </address>
        </div>
        <StoreDetailButtons details={storeDetailData} />
      </div>
    </section>
  );
}

export default StoreDetails;
