"use client";
import {
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useRef, useState } from "react";
import { Scatter, getElementAtEvent } from "react-chartjs-2";
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const data = {
  datasets: [
    {
      label: "A dataset",
      data: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 3, y: -2 },
        { x: 4, y: 4 },
      ],
      backgroundColor: "rgba(255, 99, 132, 1)",
      pointRadius: 3,
      pointHoverRadius: 10,
    },
  ],
};

export default function ChartPage() {
  const [clickedIndex, setClickedIndex] = useState(null);
  const chartRef = useRef();
  const onClick = (e) => {
    const element = getElementAtEvent(chartRef.current, e);
    if (element.length === 0) {
      return;
    }
    setClickedIndex(element[0].index);
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <Scatter
          ref={chartRef}
          options={options}
          data={data}
          onClick={onClick}
        />
      </div>
      <div className="flex-1">
        <div>Clicked index: {clickedIndex}</div>
      </div>
    </div>
  );
}
