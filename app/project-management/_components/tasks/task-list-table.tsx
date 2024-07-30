// import { Task } from "../../types/public-types";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";
import React, { useMemo } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import styles from "./task-list-table.module.css";

const localeDateStringCache = {};
const toLocaleDateStringFactory =
  (locale: string) =>
  (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
    const key = date.toString();
    let lds = localeDateStringCache[key];
    if (!lds) {
      lds = date.toLocaleDateString(locale, dateTimeOptions);
      localeDateStringCache[key] = lds;
    }
    return lds;
  };
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

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
  locale: string;
  tasks: any[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: any) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
  setUpdateFormOpen,
  setCreateFormOpen,
  setUpdateInitialValues,
  setCreateInitialValues,
}) => {
  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    [locale],
  );

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
                {/* <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div> */}
                <div
                  className={clsx(
                    "cursor-pointer hover:underline",
                    t.level === 2 && "pl-4",
                  )}
                  onClick={() => {
                    setUpdateFormOpen(true);
                    setUpdateInitialValues(t);
                  }}
                >
                  {t.name}
                </div>
                {t.level === 1 && (
                  <RiAddCircleFill
                    size={20}
                    className="cursor-pointer"
                    onClick={() => {
                      setCreateFormOpen(true);
                      setCreateInitialValues({
                        name: "",
                        type: "task",
                        level: 2,
                        status: "todo",
                        progress: 0,
                        start: new Date(),
                        end: new Date(
                          new Date().getTime() + 24 * 60 * 60 * 1000,
                        ),
                        parentTaskId: t.id,
                        projectId: t.projectId,
                      });
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
