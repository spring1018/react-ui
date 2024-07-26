import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableDemo } from "./action-table";
import ICChart from "./ic";
import LineChart from "./line-chart";
import TooltipDemo from "./tooltip";

export default function StrategyDisplay({ item }) {
  return (
    <div className="space-y-2 mx-2">
      <Card>
        <CardHeader>
          <CardTitle>戦略</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{item.strategy}</p>
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
  );
}
