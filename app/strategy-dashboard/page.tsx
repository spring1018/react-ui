"use client";
import { MultiSelect } from "@/components/molecules/MultiSelect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { TableDemo } from "./_components/action-table";
import ICChart from "./_components/ic";
import LineChart from "./_components/line-chart";
import TooltipDemo from "./_components/tooltip";
import { centers } from "./_data/portfolio/centers";
import { data } from "./_data/portfolio/data";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels,
);

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: "売上総利益",
      },
      // min: 0,
      // max: 2500000000,
      ticks: {
        display: true,
      },
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: true,
        text: "売上高CAGR",
      },
      // min: -0.2,
      // max: 0.2,
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
          yMin: 0,
          yMax: 0,
          borderColor: "gray",
          borderWidth: 2,
        },
        // line2: {
        //   type: "line",
        //   xMin: 2.5,
        //   xMax: 2.5,
        //   borderColor: "red",
        //   borderWidth: 2,
        // },
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
  const [month1, setMonth1] = useState("AsIs");
  const [month2, setMonth2] = useState("ToBe");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [selectedCenters, setSelectedCenters] = useState(
    centers.map((center) => center.value),
  );
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
    setClickedIndex(element[0].element.$context.raw.id);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sticky">
        <h1 className="text-3xl font-bold">経営戦略ダッシュボード</h1>
        {clickedIndex === null ? (
          <p className="text-3xl font-bold">製品を選択してください</p>
        ) : (
          <p className="text-3xl font-bold">
            {data.find((d) => d.id === clickedIndex)?.label}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 h-screen">
        <Card>
          <CardHeader>
            <CardTitle>ポートフォリオ</CardTitle>
            <CardDescription>特定の領域に偏っていないか？</CardDescription>
            <CardDescription>
              最適な投下資本配分ができているか？
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-1">
              <div>対象:</div>
              <div className="col-span-5">
                <MultiSelect
                  options={centers}
                  selected={selectedCenters}
                  onChange={setSelectedCenters}
                />
              </div>
              <div>半径の指標:</div>
              <Combobox
                options={[
                  { value: "ic", label: "IC" },
                  { value: "nopat", label: "NOPAT" },
                  { value: "roic", label: "ROIC" },
                  { value: "mp", label: "MP" },
                ]}
                initialValue={"ic"}
              />
            </div>
            <Bubble
              ref={chartRef}
              options={options}
              data={chartData(month1, month2)}
              onClick={onClick}
              height={230}
            />
          </CardContent>
        </Card>
        <div className="grid gap-y-2 overflow-auto h-full">
          {clickedIndex && (
            <div className="grid gap-y-2 w-full">
              <Card>
                <CardHeader>
                  <CardTitle>戦略</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{data.find((d) => d.id === clickedIndex)?.strategy}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>アクション</CardTitle>
                </CardHeader>
                <CardContent>
                  <TableDemo />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle>ROIC</CardTitle>
                    <TooltipDemo text="NOPAT / IC" />
                  </div>
                </CardHeader>
                <CardContent>
                  <LineChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle>IC(内訳)</CardTitle>
                    <TooltipDemo text="売上債権 + 在庫 + 有形固定資産 + 無形固定資産 - 仕入債務" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ICChart />
                </CardContent>
              </Card>
              <div className="flex items-center">
                <h2 className="text-2xl pt-2">NOPAT(内訳)</h2>
                <TooltipDemo text="売上高 - 売上原価 - 販売費及び一般管理費" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
