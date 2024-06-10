"use client";
import { Combobox } from "@/components/ui/combobox";
import {
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useRef, useState } from "react";
import { Bubble, getElementAtEvent } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels,
);

const data1 = [
  {
    x: 1,
    y: 1,
    label: "製品A",
    date: "2024-01",
    segment: "育成",
    nextSegment: "注力",
    r: 10,
  },
  {
    x: 2,
    y: 3,
    label: "製品B",
    date: "2024-01",
    segment: "育成",
    nextSegment: "注力",
    r: 20,
  },
  {
    x: 3,
    y: -2,
    label: "製品C",
    date: "2024-01",
    segment: "基盤",
    nextSegment: "基盤",
    r: 20,
  },
  {
    x: 4,
    y: 4,
    label: "製品D",
    date: "2024-01",
    segment: "注力",
    nextSegment: "基盤",
    r: 1.5,
  },
];
const data2 = [
  {
    x: 1,
    y: 2,
    label: "製品A",
    date: "2024-07",
    segment: "育成",
    nextSegment: "注力",
    r: 15,
  },
  {
    x: 2,
    y: 4,
    label: "製品B",
    date: "2024-07",
    segment: "育成",
    nextSegment: "注力",
    r: 35,
  },
  {
    x: 3,
    y: -1,
    label: "製品C",
    date: "2024-07",
    segment: "基盤",
    nextSegment: "基盤",
    r: 5,
  },
  {
    x: 4,
    y: 3,
    label: "製品D",
    date: "2024-07",
    segment: "注力",
    nextSegment: "基盤",
    r: 10,
  },
];
const data = [...data1, ...data2];

const options = {
  scales: {
    x: {
      ticks: {
        display: true,
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: true,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    datalabels: {
      align: "end",
      anchor: "end",
      formatter: (value) => value.label,
    },
    legend: {
      display: false,
    },
    annotation: {
      annotations: {
        line1: {
          type: "line",
          yMin: 1,
          yMax: 1,
          borderColor: "red",
          borderWidth: 2,
        },
        line2: {
          type: "line",
          xMin: 2.5,
          xMax: 2.5,
          borderColor: "red",
          borderWidth: 2,
        },
      },
    },
  },
};

const chartData = (date1, date2) => {
  const filteredData1 = data.filter((d) => d.date === date1);
  const filteredData2 = data.filter((d) => d.date === date2);
  return {
    datasets: [
      {
        label: "A dataset 1",
        data: filteredData1,
        backgroundColor: "rgba(201, 203, 207, 1)",
        pointRadius: 6,
        pointHoverRadius: 10,
      },
      {
        label: "A dataset 2",
        data: filteredData2,
        backgroundColor: "rgba(255, 99, 132, 1)",
        pointRadius: 6,
        pointHoverRadius: 10,
      },
    ],
  };
};

export default function ChartPPMPage() {
  const [month1, setMonth1] = useState("2024-01");
  const [month2, setMonth2] = useState("2024-07");
  const [clickedIndex, setClickedIndex] = useState(null);
  const chartRef = useRef();

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        chartRef.current?.update();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const onClick = (e) => {
    const element = getElementAtEvent(chartRef.current, e);
    if (element.length === 0) {
      return;
    }
    setClickedIndex(element[0].index);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl">経営戦略ダッシュボード</h1>
      <div className="flex justify-between gap-4">
        <div className="flex-1 space-y-2">
          <p className="text-2xl">プロダクトポートフォリオ</p>
          <div className="grid">
            <div>
              比較対象:
              <Combobox
                options={[
                  { value: "2024-01", label: "2024-01" },
                  { value: "2024-07", label: "2024-07" },
                ]}
                initialValue={month1}
                onChange={(value: string) => {
                  setMonth1(value);
                }}
              />
            </div>
            <div>
              表示月:
              <Combobox
                options={[
                  { value: "2024-01", label: "2024-01" },
                  { value: "2024-04", label: "2024-04" },
                  { value: "2024-07", label: "2024-07" },
                ]}
                initialValue={month2}
                onChange={(value: string) => {
                  setMonth2(value);
                }}
              />
            </div>
          </div>
          <Bubble
            ref={chartRef}
            options={options}
            data={chartData(month1, month2)}
            onClick={onClick}
          />
        </div>
        <div className="flex-1">
          <p className="text-2xl">
            プロダクト詳細: {data[clickedIndex]?.label}
          </p>
          <p>
            {data[clickedIndex]?.segment} → {data[clickedIndex]?.nextSegment}
          </p>
        </div>
      </div>
    </div>
  );
}
