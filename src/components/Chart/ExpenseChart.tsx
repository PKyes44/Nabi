"use client";
import expenseData from "@/public/finance/expense.json";
import { ArcElement, Chart, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Title);

type ExpenseDataType = {
  [key: string]: string | number;
};

type ExpenseType = {
  businessExpense: number;
  fund: number;
  other: number;
};

const convertNumber = (object: ExpenseDataType) => {
  for (const key in object) {
    object[key] = Number(object[key]);
  }
  return object as ExpenseType;
};
const expense = convertNumber(expenseData);

const sumValue = (object: ExpenseType) => {
  let value = 0;
  for (const key in object) {
    value += object[key as keyof ExpenseType];
  }
  return value;
};

const allExpense = sumValue(expense);

const data = {
  labels: ["사업 수행 비용", "모금 비용", "기타"],
  datasets: [
    {
      data: Object.values(expense),
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
      <section className="w-64 h-64 relative m-auto">
        <Doughnut className="w-64 h-64 m-auto" data={data} options={options} />
        <h2 className="font-bold text-2xl absolute top-[35%] left-[50%] translate-x-[-50%]">
          2023 지출
        </h2>
      </section>
      <ul className="w-96 m-auto border-t-2 border-black pt-4">
        {Object.values(expense).map((label, index) => (
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

export default ExpenseChart;
