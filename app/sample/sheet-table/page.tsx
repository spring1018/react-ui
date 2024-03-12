"use client";
import { ShadcnuiTable } from "@/components/organisms/ShadcnuiTable";
import useSWR from "swr";
import { columns } from "./columns";

export default function SheetTablePage() {
  const apiUrl = "http://localhost:3004/mock-sample";

  const fetcher = (url: string): Promise<[]> =>
    fetch(url).then((res) => res.json());
  const { data, error } = useSWR(apiUrl, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="px-2 py-2">
      <ShadcnuiTable
        columns={columns}
        defaultData={data}
        apiUrl={apiUrl}
        // pageSizes={[5, 20, 30, 40, 50]}
      />
    </div>
  );
}
