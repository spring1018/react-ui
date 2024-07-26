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
import { useState } from "react";
import { Bubble } from "react-chartjs-2";
import { centers } from "../_data/portfolio/centers";
import TooltipDemo from "./tooltip";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin,
  ChartDataLabels,
);

export default function Portfolio({ data, setClickedIndex }) {
  const [selectedCenters, setSelectedCenters] = useState(
    centers
      .filter((center) => center.category === "既存")
      .map((center) => center.value),
  );
  const [xAxes, setXAxes] = useState("売上総利益");

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: `${xAxes} (百万円)`,
        },
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
          text: "売上高CAGR (%)",
        },
        ticks: {
          display: true,
        },
        grid: {
          display: false,
        },
      },
    },
    // https://stackoverflow.com/questions/65822762/how-to-add-onclick-event-on-chart-label-in-react-chartjs-2
    onClick: (evt, element) => {
      if (element.length > 0) {
        setClickedIndex(element[0].element.$context.raw.id);
      }
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
        },
      },
    },
  };

  const chartData = (data, date1, date2) => {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <CardTitle className="flex ">ポートフォリオ</CardTitle>
          <TooltipDemo text="グレー(AsIs): 2018~2023売上高CAGR / 2023年度の<横軸の指標>、赤(ToBe): 2024~2028売上高CAGR / 2028年度の<横軸の指標> " />
        </div>
        <CardDescription>
          特定の領域に偏っていないか？最適な投下資本配分ができているか？
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-6 gap-2 items-center">
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
          <div>横軸の指標:</div>
          <Combobox
            options={[
              { value: "売上総利益", label: "売上総利益" },
              { value: "限界利益", label: "限界利益" },
              { value: "営業利益", label: "営業利益" },
            ]}
            initialValue={"売上総利益"}
            onChange={(e) => setXAxes(e.value)}
          />
        </div>
        <Bubble
          options={options}
          data={chartData(
            data
              .filter((d) => d.indicator === xAxes)
              .filter((d) => selectedCenters.includes(d.label)),
            "AsIs",
            "ToBe",
          )}
          height={230}
        />
      </CardContent>
    </Card>
  );
}
