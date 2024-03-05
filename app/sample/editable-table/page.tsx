"use client";
import { SimpleShadcnuiTable } from "@/components/organisms/SimpleShadcnuiTable";
import useSWR from "swr";
import { columnDefs } from "./columnDefs";


export default function EditableTablePage() {
  const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json());
  const { data, error } = useSWR('http://localhost:3004/mock-sample', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className="px-2 py-2">
      <SimpleShadcnuiTable columnDefs={columnDefs} defaultData={data} />
    </div>
  );
}
