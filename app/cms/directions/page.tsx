import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { directions } from "../_data/directions";

export default function TablePage() {
  return (
    <div>
      <h1 className="text-lg font-bold">依頼書一覧</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {directions.map((direction) => (
            <TableRow key={direction.id}>
              <TableCell>{direction.id}</TableCell>
              <TableCell>{direction.title}</TableCell>
              <TableCell>{direction.assignee}</TableCell>
              <TableCell>
                <Badge>{direction.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
