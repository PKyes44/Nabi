import ExpenseChart from "@/components/Chart/ExpenseChart";
import IncomeChart from "@/components/Chart/IncomeChart";
import TextBox from "./TextBox";
import Thumbnail from "./Thumbnail";

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
      <section className="w-full h-[calc(235vh-64px)] bg-orange-200 flex flex-col gap-y-10 px-7">
        <IncomeChart />
        <ExpenseChart />

        <article className="flex flex-col gap-y-5 text-center mt-10">
          <span className="font-bold text-3xl m-auto text-center">
            <span className="text-yellow-50">나비</span>는 <br />
            약속합니다
          </span>
          <TextBox
            titleBgColor="bg-orange-400"
            title="엄격한 법률 준수"
            content="국세청에 재무 현황을 공시하고 행정안전부에 보고하는 의무를 다합니다"
          />
          <TextBox
            titleBgColor="bg-orange-400"
            title="철저한 내외부 감사"
            content="매년 회계법인으로부터 외부 감사를 통해 투명하게 재정 운영을 검증받습니다"
          />
          <TextBox
            titleBgColor="bg-orange-400"
            title="투명한 정보 공개"
            content="회계 현황을 감사보고서, 수입지출보고서, 공시 등을 통해 공개합니다"
          />
        </article>
      </section>
    </Thumbnail>
  );
}

export default Finances;
