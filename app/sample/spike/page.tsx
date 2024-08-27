"use client";
import { CircleProgress } from "@/components/molecules/CircleProgress";

export default function Page() {
  return (
    <div className="p-4">
      <CircleProgress value={30} indicatorColor="blue" backgroudColor="cyan" />
    </div>
  );
}
