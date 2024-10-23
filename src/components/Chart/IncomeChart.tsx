"use client";
import income from "@/public/finance/income.json";
import { ArcElement, Chart, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Title);
const allIncome =
  Number(income.donations) +
  Number(income.otherIncome) +
  Number(income.incomeFromDonations);
function IncomeChart() {
  const data = {
    labels: ["기부금", "기부금 외 수입", "기부금 운용을 통한 수입"],
    datasets: [
      {
        data: [
          income.donations,
          income.otherIncome,
          income.incomeFromDonations,
        ],
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

  return (
    <div className="pt-12">
      <Doughnut className="w-96 h-96 m-auto" data={data} options={options} />
      <ul className="w-96 m-auto border-t-2 border-black pt-4">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-orange-500 w-5 h-5" />
            <p>기부금</p>
          </div>

          <p>{Number(income.donations).toLocaleString()}원</p>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-sky-300 w-5 h-5" />
            <p>기부금 외 수입</p>
          </div>

          <p>{Number(income.otherIncome).toLocaleString()}원</p>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-gray-500 w-5 h-5" />
            <p>기부금 운용을 통한 수입</p>
          </div>

          <p>{Number(income.incomeFromDonations).toLocaleString()}원</p>
        </li>
      </ul>
    </div>
  );
}

export default IncomeChart;
