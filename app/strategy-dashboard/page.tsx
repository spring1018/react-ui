"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import { TableDemo } from "./_components/action-table";
import ICChart from "./_components/ic";
import LineChart from "./_components/line-chart";
import Portfolio from "./_components/portfolio";
import TooltipDemo from "./_components/tooltip";
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

export default function ChartPPMPage() {
  const [clickedIndex, setClickedIndex] = useState(null);

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
        <Portfolio data={data} setClickedIndex={setClickedIndex} />
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
