import { Chart } from "./_components/chart";

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>
      <p>案件数</p>
      <div className="flex">
        <Chart />
        <Chart />
      </div>
      <div>対応が必要な案件一覧</div>
    </div>
  );
}
