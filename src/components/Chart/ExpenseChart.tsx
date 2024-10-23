"use client";
import expense from "@/public/finance/expense.json";
import { ArcElement, Chart, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Title);

const allExpense =
  Number(expense.businessExpense) +
  Number(expense.fund) +
  Number(expense.other);

const data = {
  labels: ["사업 수행 비용", "모금 비용", "기타"],
  datasets: [
    {
      data: [expense.businessExpense, expense.fund, expense.other],
      backgroundColor: ["orange", "skyblue", "gray"],
      borderColor: ["orange", "skyblue", "gray"],
    },
  ],
};

const options = {
  plugins: {
    title: {
      position: "bottom" as const,
      display: true,
      text: `${allExpense.toLocaleString()}원`,
      font: {
        size: 30,
      },
    },
  },
  cutout: "80%",
};
function ExpenseChart() {
  return (
    <div className="pt-12">
      <section className="w-96 h-96 relative">
        <Doughnut className="w-96 h-96 m-auto" data={data} options={options} />
        <h2 className="font-bold text-2xl absolute top-[40%] left-[50%] translate-x-[-50%]">
          2023 지출
        </h2>
      </section>
      <ul className="w-96 m-auto border-t-2 border-black pt-4">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-orange-500 w-5 h-5" />
            <p>사업 수행 비용</p>
          </div>

          <p>{Number(expense.businessExpense).toLocaleString()}원</p>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-sky-300 w-5 h-5" />
            <p>모금 비용</p>
          </div>

          <p>{Number(expense.fund).toLocaleString()}원</p>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-gray-500 w-5 h-5" />
            <p>기타</p>
          </div>

          <p>{Number(expense.other).toLocaleString()}원</p>
        </li>
      </ul>
    </div>
  );
}

export default ExpenseChart;
