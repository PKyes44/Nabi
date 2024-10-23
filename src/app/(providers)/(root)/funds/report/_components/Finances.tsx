import ExpenseChart from "@/components/Chart/ExpenseChart";
import IncomeChart from "@/components/Chart/IncomeChart";

function Finances() {
  return (
    <>
      <section className="w-full h-[calc(210vh-64px)] bg-orange-200 flex flex-col gap-y-10 px-7"></section>
      <section className="w-full h-[calc(210vh-64px)] bg-orange-200 flex flex-col gap-y-10 px-7">
        <IncomeChart />
        <ExpenseChart />

        <article className="flex flex-col gap-y-5 text-center mt-10">
          <span className="font-bold text-3xl m-auto text-center">
            <span className="text-yellow-400">나비</span>는 <br />
            약속합니다
          </span>

          <div className="bg-white border border-black rounded-md overflow-hidden">
            <div className="bg-orange-400 py-2">
              <span className="">엄격한 법률 준수</span>
            </div>
            <hr className="bg-black h-0.5" />
            <div className="py-3 px-6">
              <p>
                국세청에 재무 현황을 공시하고 행정안전부에 보고하는 의무를
                다합니다
              </p>
            </div>
          </div>
          <div className="bg-white border border-black rounded-md overflow-hidden">
            <div className="bg-orange-400 py-2">
              <span className="">철저한 내외부 감사</span>
            </div>
            <hr className="bg-black h-0.5" />
            <div className="py-3 px-6">
              <p>
                매년 회계법인으로부터 외부 감사를 통해 투명하게 재정 운영을
                검증받습니다
              </p>
            </div>
          </div>
          <div className="bg-white border border-black rounded-md overflow-hidden">
            <div className="bg-orange-400 py-2">
              <span className="">투명한 정보 공개</span>
            </div>
            <hr className="bg-black h-0.5" />
            <div className="py-3 px-6">
              <p>
                회계 현황을 감사보고서, 수입지출보고서, 공시 등을 통해
                공개합니다
              </p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}

export default Finances;
