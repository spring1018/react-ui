import React from "react";
import styles from "./task-list-header.module.css";

export const TaskListHeader: React.FC<{
  hideColumns: boolean;
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
}> = ({ hideColumns, headerHeight, fontFamily, fontSize, rowWidth }) => {
  return (
    <div
      className={styles.ganttTable}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      <div
        className={styles.ganttTable_Header}
        style={{
          height: headerHeight - 2,
        }}
      >
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            // minWidth: rowWidth,
            minWidth: "300px",
          }}
        >
          &nbsp;Title
        </div>
        <div
          className={styles.ganttTable_HeaderSeparator}
          style={{
            height: headerHeight * 0.5,
            marginTop: headerHeight * 0.2,
          }}
        />
        {!hideColumns && (
          <>
            <div
              className={styles.ganttTable_HeaderItem}
              style={{
                // minWidth: rowWidth,
                minWidth: "100px",
              }}
            >
              &nbsp;From
            </div>
            <div
              className={styles.ganttTable_HeaderSeparator}
              style={{
                height: headerHeight * 0.5,
                marginTop: headerHeight * 0.25,
              }}
            />
            <div
              className={styles.ganttTable_HeaderItem}
              style={{
                // minWidth: rowWidth,
                minWidth: "100px",
              }}
            >
              &nbsp;To
            </div>
          </>
        )}
        <div
          className={styles.ganttTable_HeaderItem}
          style={{
            // minWidth: rowWidth,
            minWidth: "100px",
          }}
        >
          &nbsp;Progress
        </div>
      </div>
    </div>
  );
};
