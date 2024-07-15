"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { FaCircleCheck, FaRegCircleDot } from "react-icons/fa6";

type Issue = {
  title: string;
  url: string;
  state: string;
  labels: string[];
};

type IssueListProps = {
  items: Issue[];
  ignoreLabels?: string[];
};

export const IssueList = ({ items, ignoreLabels }: IssueListProps) => {
  return (
    <ScrollArea className="h-96 rounded-md border bg-slate-100">
      <div className="flex flex-col gap-2 p-2">
        {items.map((item) => (
          <button
            key={item.url}
            className="flex flex-col items-start gap-2 rounded-lg border bg-white p-2 text-left text-sm transition-all hover:bg-accent"
          >
            <div className="flex items-center gap-2">
              {item.state === "open" ? (
                <FaRegCircleDot color={"red"} />
              ) : (
                <FaCircleCheck color={"green"} />
              )}
              <div className="flex gap-1">
                {item.labels.map(
                  (label) =>
                    // label が ignoreLabels に含まれる場合は表示しない
                    !ignoreLabels?.includes(label) && (
                      <Badge key={label}>{label}</Badge>
                    ),
                )}
              </div>
            </div>
            <Link href={item.url} target="_blank">
              <p className="text-sm font-bold">{item.title}</p>
            </Link>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
};
