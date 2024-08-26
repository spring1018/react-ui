import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LuCircleDashed } from "react-icons/lu";
import { RiAddCircleFill, RiProgress8Line } from "react-icons/ri";
import { useTask } from "../../hooks/use-task";
import styles from "./task-list-table.module.css";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export const TaskListTable: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  tasks: any[];
  setOpen: (open: boolean) => void;
}> = ({ rowHeight, rowWidth, tasks, fontFamily, fontSize, setOpen }) => {
  const [task, setTask] = useTask();

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map((t) => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true) {
          expanderSymbol = "▶";
        }

        return (
          <div
            className={styles.taskListTableRow}
            style={{ height: rowHeight }}
            key={`${t.id}row`}
            // onClick={() => console.log(t.id)}
          >
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: rowWidth,
                minWidth: "300px",
                maxWidth: rowWidth,
              }}
              title={t.name}
            >
              <div
                className={clsx(
                  styles.taskListNameWrapper,
                  "flex justify-between items-center px-2",
                )}
              >
                <div className="flex items-center gap-2">
                  {t.status === "todo" && (
                    <LuCircleDashed className="text-slate-500" />
                  )}
                  {t.status === "in progress" && (
                    <RiProgress8Line className="text-slate-500" />
                  )}
                  {t.status === "done" && (
                    <FaCheckCircle className="text-green-600" />
                  )}
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <div
                    className={clsx(
                      "cursor-pointer hover:underline",
                      t.parentTaskId && "pl-4",
                      !t.parentTaskId && "font-semibold",
                    )}
                    onClick={() => {
                      setTask({ ...t, selected: t.id });
                      setOpen(true);
                    }}
                  >
                    {t.name}
                  </div>
                </div>
                {!t.parentTaskId && (
                  <RiAddCircleFill
                    size={20}
                    className="cursor-pointer"
                    onClick={() => {
                      setTask({
                        ...t,
                        id: "",
                        name: "",
                        progress: 0,
                        parentTaskId: t.id,
                        selected: t.id,
                      });
                      setOpen(true);
                    }}
                  />
                )}
              </div>
            </div>
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: rowWidth,
                minWidth: "100px",
                maxWidth: rowWidth,
              }}
            >
              {formatDate(t.start)}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: rowWidth,
                minWidth: "100px",
                maxWidth: rowWidth,
              }}
            >
              {formatDate(t.end)}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: rowWidth,
                minWidth: "100px",
                maxWidth: rowWidth,
              }}
            >
              <Progress value={t.progress} className="w-[90%] bg-slate-200 " />
            </div>
          </div>
        );
      })}
    </div>
  );
};
