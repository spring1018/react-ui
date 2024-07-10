import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type CareerCompanyProps = {
  company: string;
  summary: string;
  startDate: string;
  endDate?: string;
  roles: (() => JSX.Element)[];
};

export default function CareerCompany({
  company,
  summary,
  startDate,
  endDate = undefined,
  roles,
}: CareerCompanyProps) {
  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <div className="flex justify-start gap-4">
          <CardTitle>{company}</CardTitle>
          <CardDescription>
            {startDate} - {endDate || "現在"}
          </CardDescription>
        </div>
        <CardDescription>{summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {roles.map((Role, index) => (
            <Role key={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
