"use client";
import income from "@/public/finance/income.json";
import { ArcElement, Chart, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Title);

const allIncome =
  Number(income.donations) +
  Number(income.otherIncome) +
  Number(income.incomeFromDonations);

const data = {
  labels: ["기부금", "기부금 외 수입", "기부금 운용을 통한 수입"],
  datasets: [
    {
      data: [income.donations, income.otherIncome, income.incomeFromDonations],
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
      text: `${allIncome.toLocaleString()}원`,
      font: {
        size: 30,
      },
    },
  },
  cutout: "80%",
};

function IncomeChart() {
  return (
    <div className="pt-24">
      <section className="w-64 h-64 relative m-auto">
        <Doughnut className="w-64 h-64 m-auto" data={data} options={options} />
        <h2 className="font-bold text-2xl absolute top-[35%] left-[50%] translate-x-[-50%]">
          2023 수입
        </h2>
      </section>

      <ul className="w-96 m-auto border-t-2 border-black pt-4">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-orange-500 w-5 h-5" />
            <span>기부금</span>
          </div>

          <span>{Number(income.donations).toLocaleString()}원</span>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-sky-300 w-5 h-5" />
            <span>기부금 외 수입</span>
          </div>

          <span>{Number(income.otherIncome).toLocaleString()}원</span>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-gray-500 w-5 h-5" />
            <span>기부금 운용을 통한 수입</span>
          </div>

          <span>{Number(income.incomeFromDonations).toLocaleString()}원</span>
        </li>
      </ul>
    </div>
  );
}

export default IncomeChart;
