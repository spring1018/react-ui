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
import { ic, nopat, roic } from "../_data/roic/data";

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
