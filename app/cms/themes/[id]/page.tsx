import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { directions } from "../../_data/directions";
import { ips } from "../../_data/ips";
import { orders } from "../../_data/orders";
import { themes } from "../../_data/themes";
import { ThemeRelatedObject } from "./theme-related-object";

export default async function PageDisplay({ params }) {
  const id = params.id;
  const theme = themes.find((theme) => theme.id === id);
  const directionsByTheme = directions.filter(
    (direction) => direction.themeId === id,
  );
  const ordersByTheme = orders.filter((order) => order.themeId === id);
  const ipsByTheme = ips.filter((ip) => ip.themeId === id);

  return (
    <div className="bg-slate-100">
      <h1 className="text-lg font-bold">{theme.title}</h1>
      <div className="grid grid-cols-3 gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>テーマ詳細</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/cms/themes">
              <p className="text-blue-600">会社: {theme.company}</p>
            </Link>
            <p>担当者: {theme.assignee}</p>
            <p>ステータス: {theme.status}</p>
          </CardContent>
        </Card>
        <div className="col-span-2">
          <ThemeRelatedObject
            directions={directionsByTheme}
            ips={ipsByTheme}
            orders={ordersByTheme}
          />
        </div>
      </div>
    </div>
  );
}
