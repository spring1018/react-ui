import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type CareerRoleProps = {
  title: string;
  summary: string | (() => JSX.Element);
  startDate: string;
  endDate?: string;
};

export default function CareerRole({
  title,
  summary,
  startDate,
  endDate = undefined,
}: CareerRoleProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-start gap-4">
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {startDate} - {endDate || "現在"}
          </CardDescription>
        </div>
        <CardDescription>
            {typeof summary === "string" ? summary : summary()}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
