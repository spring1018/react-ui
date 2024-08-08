import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Directions = ({ directions }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Assignee</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>ファイル</TableHead>
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
          <TableCell>
            <Link href={"localhost:3000"}>
              <FileIcon />
            </Link>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const Orders = ({ orders }) => (
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
      {orders.map((order) => (
        <TableRow key={order.id}>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.title}</TableCell>
          <TableCell>{order.assignee}</TableCell>
          <TableCell>
            <Badge>{order.status}</Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const Ips = ({ ips }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Description</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {ips.map((ip) => (
        <TableRow key={ip.id}>
          <TableCell>{ip.id}</TableCell>
          <TableCell>{ip.title}</TableCell>
          <TableCell>{ip.description}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const ThemeRelatedObject = ({ directions, ips, orders }) => {
  return (
    <Tabs defaultValue="directions">
      <TabsList className="bg-slate-300">
        <TabsTrigger value="directions">依頼書</TabsTrigger>
        <TabsTrigger value="ips">特許</TabsTrigger>
        <TabsTrigger value="orders">サンプル発注</TabsTrigger>
        <TabsTrigger value="specification">仕様書</TabsTrigger>
      </TabsList>
      <TabsContent value="directions">
        <Card>
          <CardContent>
            <Directions directions={directions} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ips">
        <Card>
          <CardContent>
            <Ips ips={ips} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="orders">
        <Card>
          <CardContent>
            <Orders orders={orders} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
