import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const actions = [
  {
    id: 1,
    description: "XX製品を廃止し、ICをYYまで減らすことでROICを10%まで上昇する",
    dueDate: "2024-10-31",
    status: "完了",
  },
  {
    id: 2,
    description:
      "YY製品への粗利を増やし、NOPATを増やすことでROICを12%まで上昇する",
    dueDate: "2024-12-31",
    status: "進行中",
  },
  {
    id: 3,
    description: "5年間の戦略を決める",
    dueDate: "2025-03-31",
    status: "未着手",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {actions.map((action) => (
          <TableRow key={action.id}>
            <TableCell className="font-medium">{action.id}</TableCell>
            <TableCell>{action.description}</TableCell>
            <TableCell>{action.dueDate}</TableCell>
            <TableCell>
              <Badge>{action.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
