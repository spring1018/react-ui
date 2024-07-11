"use client";
import { ShadcnuiTable } from "@/components/organisms/ShadcnuiTable";
import useSWR from "swr";
import z from "zod";
import { columns } from "./columns";
import { priorities, statuses } from "./options";

export default function SheetTablePage() {
  const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/sample/sheet-table-with-db`;

  const fetcher = (url: string): Promise<[]> =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data.tasks);
  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const formSchema = z.object({
    title: z
      .string({ required_error: "Please select an email to display." })
      .describe({ type: "input" }),
    status: z.string().describe({
      type: "combobox",
      options: statuses,
    }),
    priority: z.string().describe({
      type: "combobox",
      options: priorities,
    }),
  });

  return (
    <div className="px-2 py-2">
      <ShadcnuiTable
        columns={columns}
        defaultData={data}
        apiUrl={apiUrl}
        enablePost={true}
        formSchama={formSchema}
        // pageSizes={[5, 20, 30, 40, 50]}
      />
    </div>
  );
}
