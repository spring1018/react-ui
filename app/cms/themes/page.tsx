import SheetForm from "@/app/sample/sheet-form/sheet-form";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { themes } from "../_data/themes";

export default function TablePage() {
  return (
    <div>
      <h1 className="text-lg font-bold">テーマ一覧</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {themes.map((theme) => (
            <TableRow key={theme.id}>
              <TableCell>
                <SheetForm />
              </TableCell>
              <TableCell>{theme.id}</TableCell>
              <TableCell>
                <Link href={`/cms/themes/${theme.id}`}>
                  <p className="text-blue-600">{theme.title}</p>
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/cms/themes/${theme.id}`}>
                  <p className="text-blue-600">{theme.company}</p>
                </Link>
              </TableCell>
              <TableCell>{theme.assignee}</TableCell>
              <TableCell>
                <Badge>{theme.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
