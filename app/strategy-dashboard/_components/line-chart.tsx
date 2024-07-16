"use client";
import {
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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels,
);

const roic = [
  {
    date: "2019",
    value: 0.189,
  },
  {
    date: "2020",
    value: 0.323,
  },
  {
    date: "2021",
    value: 0.315,
  },
  {
    date: "2022",
    value: 0.253,
  },
  {
    date: "2023",
    value: 0.18,
  },
  {
    date: "2024",
    value: 0.213,
  },
];

const nopat = [
  {
    date: "2019",
    value: 316,
  },
  {
    date: "2020",
    value: 561,
  },
  {
    date: "2021",
    value: 544,
  },
  {
    date: "2022",
    value: 461,
  },
  {
    date: "2023",
    value: 393,
  },
  {
    date: "2024",
    value: 389,
  },
];

const ic = [
  {
    date: "2019",
    value: 1669,
  },
  {
    date: "2020",
    value: 1734,
  },
  {
    date: "2021",
    value: 1729,
  },
  {
    date: "2022",
    value: 1823,
  },
  {
    date: "2023",
    value: 2183,
  },
  {
    date: "2024",
    value: 1823,
  },
];

export default function LineChart() {
  const labels = roic.map((d) => d.date);
  const chartRef = useRef(null);

  return (
    <Line
      ref={chartRef}
      data={{
        labels: labels,
        datasets: [
          {
            label: "ROIC",
            data: roic.map((d) => d.value),
            yAxisID: "y1",
            borderColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "NOPAT",
            data: nopat.map((d) => d.value),
            yAxisID: "y2",
            borderColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "IC",
            data: ic.map((d) => d.value),
            yAxisID: "y2",
            borderColor: "rgba(75, 192, 192, 1)",
          },
        ],
      }}
      options={{
        scales: {
          y1: {
            title: {
              display: true,
              text: "ROIC",
            },
            type: "linear",
            display: true,
            position: "left",
          },
          y2: {
            title: {
              display: true,
              text: "NOPAT, IC",
            },
            type: "linear",
            display: true,
            position: "right",
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      }}
      height={125}
    />
  );
}
