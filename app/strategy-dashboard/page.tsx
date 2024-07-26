"use client";
import { useState } from "react";
import Portfolio from "./_components/portfolio";
import StrategyDisplay from "./_components/strategy-display";
import { data } from "./_data/portfolio/data";

export default function StrategyDashboardPage() {
  const [clickedIndex, setClickedIndex] = useState(null);

  return (
    <div className="grid grid-cols-2 gap-2 h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">経営戦略ダッシュボード</h1>
        <Portfolio data={data} setClickedIndex={setClickedIndex} />
      </div>
      <div className="space-y-2 overflow-y-scroll">
        <div className="mx-2 sticky top-0 font-bold text-3xl">
          {clickedIndex === null ? (
            <p>製品を選択してください</p>
          ) : (
            <p>{data.find((d) => d.id === clickedIndex)?.label}</p>
          )}
        </div>
        <div className="space-y-2">
          {clickedIndex && (
            <StrategyDisplay item={data.find((d) => d.id === clickedIndex)} />
          )}
        </div>
      </div>
    </div>
  );
}
