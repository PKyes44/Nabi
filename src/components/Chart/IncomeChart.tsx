"use client";
import incomeData from "@/public/finance/income.json";
import { ArcElement, Chart, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Title);

type IncomeDataType = {
  [key: string]: string | number;
};

type IncomeType = {
  donations: number;
  otherIncome: number;
  incomeFromDonations: number;
};

const convertNumber = (object: IncomeDataType) => {
  for (const key in object) {
    object[key] = Number(object[key]);
  }
  return object as IncomeType;
};
const income = convertNumber(incomeData);

const sumValue = (object: IncomeType) => {
  let value = 0;
  for (const key in object) {
    value += object[key as keyof IncomeType];
  }
  return value;
};
const allIncome = sumValue(income);

const data = {
  labels: ["기부금", "기부금 외 수입", "기부금 운용을 통한 수입"],
  datasets: [
    {
      data: Object.values(income),
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
        {Object.values(income).map((label, index) => (
          <li key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <div
                style={{ background: data.datasets[0].backgroundColor[index] }}
                className={`w-5 h-5`}
              />
              <p>{data.labels[index]}</p>
            </div>

            <p>{label.toLocaleString()}원</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeChart;
