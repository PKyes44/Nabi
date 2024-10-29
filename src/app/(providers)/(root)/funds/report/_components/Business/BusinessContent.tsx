import DonationChart from "@/components/Chart/DonationChart";
import donationData from "@/public/finance/donation.json";
import TextBox from "../TextBox";

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

function BusinessContent() {
  return (
    <section className="w-full h-[calc(235vh-64px)] bg-sky-100 items-center flex flex-col gap-y-10 px-7 py-16">
      <div className="flex flex-col items-center">
        <p>총 사업비</p>
        <p>
          <span className="font-bold text-2xl text-sky-400">
            {allDonation.toLocaleString()}
          </span>
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

      <DonationChart />

      <div className="grid grid-cols-2 gap-5 mt-10">
        <TextBox
          titleBgColor="bg-sky-400"
          title="건강"
          content="의료 및 보건 시스템 사각지대에 놓인 이웃을 발굴하고 지원합니다"
        />
        <TextBox
          titleBgColor="bg-sky-400"
          title="교육"
          content="청소년·청년이 나답게 살 수 있도록 배움의 기회를 지원합니다"
        />
        <TextBox
          titleBgColor="bg-sky-400"
          title="노동"
          content="노동 사각지대를 발굴 및 지원해 일하는 사람이 존중받는 사회를 만듭니다"
        />
        <TextBox
          titleBgColor="bg-sky-400"
          title="문화"
          content="문화다양성이 존중받는 사회적 토대를 마련해 다양한 삶의 양식이
            공존하는 사회를 만듭니다"
        />
        <TextBox
          titleBgColor="bg-sky-400"
          title="안전"
          content="사회적 관계망을 기반으로 돌봄을 지원해 모두가 안심할 수 있는
            사회 안전망을 구축합니다"
        />
        <TextBox
          titleBgColor="bg-sky-400"
          title="주거"
          content="문화다양성이 존중받는 사회적 토대를 마련해 다양한 삶의 양식이
            공존하는 사회를 만듭니다"
        />
        <TextBox
          titleBgColor="bg-sky-400"
          title="환경"
          content="환경 의제 발굴과 대안 제시를 통해 기업·정부·시민을 연결하고
            실천을 이끌어냅니다"
        />
        <TextBox
          titleBgColor="bg-sky-400"
          title="사회참여"
          content="시민·공익단체와 함께 문제를 발굴하고, 대안을 찾는 실험으로
            모두를 위한 변화를 만듭니다"
        />
      </div>
    </section>
  );
}

export default BusinessContent;
