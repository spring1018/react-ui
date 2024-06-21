"use client";
import { ShadcnuiTable } from "@/components/organisms/ShadcnuiTable";
import useSWR from "swr";
import { columns } from "./columns";
import { priorities, statuses } from "./options";

export default function SheetTablePage() {
  const apiUrl = "http://localhost:3004/mock-sample";

  const fetcher = (url: string): Promise<[]> =>
    fetch(url).then((res) => res.json());
  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const postFormColumnDefs = [
    {
      accessorKey: "title",
      title: "Title",
      componentType: "input",
      initialValue: "title",
    },
    {
      accessorKey: "status",
      title: "Status",
      componentType: "select",
      params: {
        selectOptions: statuses,
      },
      initialValue: "todo",
    },
    {
      accessorKey: "priority",
      title: "Priority",
      componentType: "select",
      params: {
        selectOptions: priorities,
      },
      initialValue: "low",
    },
    {
      accessorKey: "onlyPostField",
      title: "Only Post Field",
      componentType: "input",
      initialValue: "foo",
    },
  ];

  return (
    <div className="px-2 py-2">
      <ShadcnuiTable
        columns={columns}
        defaultData={data}
        apiUrl={apiUrl}
        enablePost={true}
        postFormColumnDefs={postFormColumnDefs}
        // pageSizes={[5, 20, 30, 40, 50]}
      />
    </div>
  );
}
