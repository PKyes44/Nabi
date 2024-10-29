import Thumbnail from "../Thumbnail";
import BusinessContent from "./BusinessContent";

function Business() {
  return (
    <Thumbnail
      id="business"
      className="h-[calc(110vh-64px)]"
      thumbnailSrc="https://gxoibjaejbmathfpztjt.supabase.co/storage/v1/object/public/icons/title-finance.jpg"
      title="사업"
      intro={
        <strong className="font-semibold z-10 relative text-lg">
          빛나는 변화를 향해 달려온 <br />
          <span
            className={`
              w-full
              before:bg-sky-400 before:w-16 before:content-[''] before:h-2
              before:absolute before:top-[2.8rem] before:left-0 before:rounded-md before:-z-10
              `}
          >
            공익사업
          </span>
          입니다
        </strong>
      }
      theme="business"
    >
      <BusinessContent />
    </Thumbnail>
  );
}

export default Business;
