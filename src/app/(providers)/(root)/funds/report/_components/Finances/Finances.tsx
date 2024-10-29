import Thumbnail from "../Thumbnail";
import FinanceContent from "./FinanceContent";

function Finances() {
  return (
    <Thumbnail
      id="finances"
      className="h-[calc(110vh-64px)]"
      thumbnailSrc="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/title-finance.jpg"
      title="재정"
      intro={
        <strong className="font-semibold z-10 relative text-lg">
          건네주신 마음 <br />
          <span
            className={`
                w-full
                before:bg-orange-500 before:w-16 before:content-[''] before:h-2
                before:absolute before:top-[2.8rem] before:left-0 before:rounded-md before:-z-10
                `}
          >
            {" "}
            투명하게 사용
          </span>
          했습니다
        </strong>
      }
      theme="finance"
    >
      <FinanceContent />
    </Thumbnail>
  );
}

export default Finances;
