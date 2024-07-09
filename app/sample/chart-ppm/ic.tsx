"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRef } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels,
);

// 売上債権
const accountsReceivable = [
  {
    date: "2019",
    value: 1836,
  },
  {
    date: "2020",
    value: 1856,
  },
  {
    date: "2021",
    value: 1862,
  },
  {
    date: "2022",
    value: 1351,
  },
  {
    date: "2023",
    value: 1762,
  },
  {
    date: "2024",
    value: 1351,
  },
];

// 在庫
const inventory = [
  {
    date: "2019",
    value: 340,
  },
  {
    date: "2020",
    value: 305,
  },
  {
    date: "2021",
    value: 389,
  },
  {
    date: "2022",
    value: 444,
  },
  {
    date: "2023",
    value: 488,
  },
  {
    date: "2024",
    value: 444,
  },
];

// 仕入債務
const accountsPayable = [
  {
    date: "2019",
    value: -1276,
  },
  {
    date: "2020",
    value: -1149,
  },
  {
    date: "2021",
    value: -1313,
  },
  {
    date: "2022",
    value: -918,
  },
  {
    date: "2023",
    value: -1180,
  },
  {
    date: "2024",
    value: -918,
  },
];

// 有形固定資産
const tangibleFixedAssets = [
  {
    date: "2019",
    value: 736,
  },
  {
    date: "2020",
    value: 688,
  },
  {
    date: "2021",
    value: 763,
  },
  {
    date: "2022",
    value: 920,
  },
  {
    date: "2023",
    value: 843,
  },
  {
    date: "2024",
    value: 920,
  },
];

// 無形固定資産
const intangibleFixedAssets = [
  {
    date: "2019",
    value: 33,
  },
  {
    date: "2020",
    value: 34,
  },
  {
    date: "2021",
    value: 28,
  },
  {
    date: "2022",
    value: 26,
  },
  {
    date: "2023",
    value: 270,
  },
  {
    date: "2024",
    value: 26,
  },
];

export default function ICChart() {
  const labels = accountsReceivable.map((d) => d.date);
  const chartRef = useRef(null);

  return (
    <Bar
      ref={chartRef}
      data={{
        labels: labels,
        datasets: [
          {
            label: "売上債権",
            data: accountsReceivable.map((d) => d.value),
            backgroundColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "在庫",
            data: inventory.map((d) => d.value),
            backgroundColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "有形固定資産",
            data: tangibleFixedAssets.map((d) => d.value),
            backgroundColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: "無形固定資産",
            data: intangibleFixedAssets.map((d) => d.value),
            backgroundColor: "rgba(255, 159, 64, 1)",
          },
          {
            label: "仕入債務",
            data: accountsPayable.map((d) => d.value),
            backgroundColor: "rgba(153, 102, 255, 1)",
          },
        ],
      }}
      options={{
        scales: {
          x: {
            stacked: true,
          },
          y: {
            title: {
              display: true,
              text: "金額（百万円）",
            },
            stacked: true,
          },
        },
      }}
      height={100}
    />
  );
}
