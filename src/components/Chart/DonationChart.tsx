"use client";
import donationData from "@/public/finance/donation.json";
import { ArcElement, Chart, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Title);

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

const data = {
  labels: ["건강", "교육", "노동", "문화", "사회참여", "안전", "주거", "환경"],
  datasets: [
    {
      data: Object.values(donation),
      backgroundColor: [
        "orange",
        "skyblue",
        "gray",
        "red",
        "purple",
        "yellow",
        "green",
        "blue",
      ],
      borderColor: [
        "orange",
        "skyblue",
        "gray",
        "red",
        "purple",
        "yellow",
        "green",
        "blue",
      ],
    },
  ],
};

const options = {
  plugins: {
    title: {
      position: "bottom" as const,
      display: true,
      text: `${allDonation.toLocaleString()}원`,
      font: {
        size: 30,
      },
    },
  },
  cutout: "80%",
};
function DonationChart() {
  return (
    <div className="pt-12">
      <section className="w-64 h-64 relative m-auto">
        <Doughnut className="w-64 h-64 m-auto" data={data} options={options} />
        <h2 className="font-bold text-2xl absolute top-[28%] left-[50%] translate-x-[-50%] text-center">
          영역별
          <br />
          후원 기금
        </h2>
      </section>

      <ul className="w-full m-auto border-t-2 border-black pt-4">
        {Object.values(donation).map((label, index) => (
          <li
            key={label}
            className="flex items-center justify-between sm:text-sm sm:mb-2"
          >
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

export default DonationChart;
