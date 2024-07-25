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
import { accountsPayable } from "../_data/ic/accounts-payable";
import { accountsReceivable } from "../_data/ic/accounts-receivable";
import { intangibleFixedAssets } from "../_data/ic/intangible-fixed-assets";
import { inventory } from "../_data/ic/inventory";
import { tangibleFixedAssets } from "../_data/ic/tangible-fixed-assets";

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
