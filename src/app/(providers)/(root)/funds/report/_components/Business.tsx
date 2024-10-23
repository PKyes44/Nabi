import donationData from "@/public/finance/donation.json";
import Thumbnail from "./Thumbnail";
type DonationDataType = {
  [key: string]: string | number;
};

type DonationType = {
  health: number;
  education: number;
  labor: number;
  culture: number;
  society: number;
  safety: number;
  abode: number;
  environment: number;
};

const convertNumber = (object: DonationDataType) => {
  for (const key in object) {
    object[key] = Number(object[key]);
  }
  return object as DonationType;
};
const donation = convertNumber(donationData);

const sumValue = (object: DonationType) => {
  let value = 0;
  for (const key in object) {
    value += object[key as keyof DonationType];
  }
  return value;
};
const allDonation = sumValue(donation);

function Business() {
  return (
    <Thumbnail
      className="h-[calc(120vh-64px)]"
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
            {" "}
            공익사업
          </span>
          입니다
        </strong>
      }
      theme="business"
    >
      <section className="w-full h-[calc(210vh-64px)] bg-sky-100 items-center flex flex-col gap-y-10 px-7 py-16">
        <div className="flex flex-col items-center">
          <p>총 사업비</p>
          <p>
            <span className="font-bold text-2xl text-sky-400">
              {allDonation.toLocaleString()}
            </span>{" "}
            원
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p>개인 지원</p>
          <p>
            <span className="font-bold text-2xl text-sky-400">6,235</span> 원
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p>단체 지원</p>
          <p>
            <span className="font-bold text-2xl text-sky-400">312</span> 건
          </p>
        </div>

        <div className="overflow-hidden w-80 h-28 border border-black rounded-2xl">
          <div className="flex items-center bg-sky-300/75 h-[40%]">
            <span className="ml-3 text-base font-semibold">건강</span>
          </div>
          <div className="flex items-center bg-white h-[60%]">
            <p className="mx-2 text-xs">
              의료 및 보건 시스템 사각지대에 놓인 이웃을 발굴하고 지원합니다.
            </p>
          </div>
        </div>
        <div className="overflow-hidden w-80 h-28 border border-black rounded-2xl">
          <div className="flex items-center bg-sky-300/75 h-[40%]">
            <span className="ml-3 text-base font-semibold">교육</span>
          </div>
          <div className="flex items-center bg-white h-[60%]">
            <p className="mx-2 text-xs">
              청소년·청년이 나답게 살 수 있도록 배움의 기회를 지원합니다.
            </p>
          </div>
        </div>
        <div className="overflow-hidden w-80 h-28 border border-black rounded-2xl">
          <div className="flex items-center bg-sky-300/75 h-[40%]">
            <span className="ml-3 text-base font-semibold">노동</span>
          </div>
          <div className="flex items-center bg-white h-[60%]">
            <p className="mx-2 text-xs">
              노동 사각지대를 발굴 및 지원해 일하는 사람이 존중받는 사회를
              만듭니다.
            </p>
          </div>
        </div>
        <div className="overflow-hidden w-80 h-28 border border-black rounded-2xl">
          <div className="flex items-center bg-sky-300/75 h-[40%]">
            <span className="ml-3 text-base font-semibold">문화</span>
          </div>
          <div className="flex items-center bg-white h-[60%]">
            <p className="mx-2 text-xs">
              문화다양성이 존중받는 사회적 토대를 마련해 다양한 삶의 양식이
              공존하는 사회를 만듭니다.
            </p>
          </div>
        </div>
        <div className="overflow-hidden w-80 h-28 border border-black rounded-2xl">
          <div className="flex items-center bg-sky-300/75 h-[40%]">
            <span className="ml-3 text-base font-semibold">안전</span>
          </div>
          <div className="flex items-center bg-white h-[60%]">
            <p className="mx-2 text-xs">
              사회적 관계망을 기반으로 돌봄을 지원해 모두가 안심할 수 있는 사회
              안전망을 구축합니다.
            </p>
          </div>
        </div>
        <div className="overflow-hidden w-80 h-28 border border-black rounded-2xl">
          <div className="flex items-center bg-sky-300/75 h-[40%]">
            <span className="ml-3 text-base font-semibold">주거</span>
          </div>
          <div className="flex items-center bg-white h-[60%]">
            <p className="mx-2 text-xs">
              주거 사각지대를 발굴해 지원하며, 주거 운동 단체들의 역량강화 및
              활동을 돕습니다.
            </p>
          </div>
        </div>
        <div className="overflow-hidden w-80 h-28 border border-black rounded-2xl">
          <div className="flex items-center bg-sky-300/75 h-[40%]">
            <span className="ml-3 text-base font-semibold">환경</span>
          </div>
          <div className="flex items-center bg-white h-[60%]">
            <p className="mx-2 text-xs">
              환경 의제 발굴과 대안 제시를 통해 기업·정부·시민을 연결하고 실천을
              이끌어냅니다.
            </p>
          </div>
        </div>
        <div className="overflow-hidden w-80 h-28 border border-black rounded-2xl">
          <div className="flex items-center bg-sky-300/75 h-[40%]">
            <span className="ml-3 text-base font-semibold">사회참여</span>
          </div>
          <div className="flex items-center bg-white h-[60%]">
            <p className="mx-2 text-xs">
              시민·공익단체와 함께 문제를 발굴하고, 대안을 찾는 실험으로 모두를
              위한 변화를 만듭니다.
            </p>
          </div>
        </div>
      </section>
    </Thumbnail>
  );
}

export default Business;
