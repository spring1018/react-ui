// import { Task } from "../../types/public-types";
import { Progress } from "@/components/ui/progress";
import React, { useMemo } from "react";
import { Form } from "./form";
import styles from "./task-list-table.module.css";

const PUT = (id, task) => {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = "http://localhost:3004/tasks";
  try {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    console.error("Error updating data:", error);
  }
};
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
                minWidth: "200px",
                maxWidth: rowWidth,
              }}
              title={t.name}
            >
              <div className={styles.taskListNameWrapper}>
                <div
                  className={
                    expanderSymbol
                      ? styles.taskListExpander
                      : styles.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(t)}
                >
                  {expanderSymbol}
                </div>
                <Form
                  initialValues={t}
                  handleSubmit={(data) => PUT(t.id, data)}
                />
                <div>{t.name}</div>
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
              {/* &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
              {/* yyyy/mm/dd 表記にする */}
              &nbsp;{t.start.getFullYear()}/{t.start.getMonth()}/
              {t.start.getDate()}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                // minWidth: rowWidth,
                minWidth: "100px",
                maxWidth: rowWidth,
              }}
            >
              {/* &nbsp;{toLocaleDateString(t.end, dateTimeOptions)} */}
              {/* yyyy/mm/dd 表記にする */}
              &nbsp;{t.end.getFullYear()}/{t.end.getMonth()}/{t.end.getDate()}
            </div>
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
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
