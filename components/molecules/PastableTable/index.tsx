import { Button } from "@/components/ui/button";
import Spreadsheet from "react-spreadsheet";

type Data = { value: string }[][];

type PastableTableProps = {
  data?: Data;
  setData?: (data: { value: string }[][]) => void;
  columnLabels?: string[];
  hideColumnIndicators?: boolean;
  hideRowIndicators?: boolean;
  onChange?: () => void;
};

export const PastableTable = ({
  data = [],
  setData = () => {},
  columnLabels = [],
  hideColumnIndicators = false,
  hideRowIndicators = false,
  onChange = () => {},
}: PastableTableProps) => {
  // { column: value } の形に変換する
  const parseData = (data: { value: string }[][]) => {
    const parsedData = data.map((row) => {
      return row.reduce((acc, cell, i) => {
        return { ...acc, [columnLabels[i]]: cell.value };
      }, {});
    });
    return parsedData;
  };

  const addRow = () => {
    setData((data) => {
      return [...data, data[0].map(() => ({ value: "" }))];
    });
  };

  const removeRow = () => {
    setData((data) => {
      return data.slice(0, data.length - 1);
    });
  };

  const addColumn = () => {
    setData((data) => {
      return data.map((row) => {
        return [...row, { value: "" }];
      });
    });
  };

  const removeColumn = () => {
    setData((data) =>
      data.map((row) => {
        return row.slice(0, row.length - 1);
      }),
    );
  };

  return (
    <div>
      <div className="flex gap-2 py-2">
        <Button variant="outline" onClick={addRow}>
          行 +
        </Button>
        <Button variant="outline" onClick={removeRow}>
          行 -
        </Button>
        <Button variant="outline" onClick={addColumn}>
          列 +
        </Button>
        <Button variant="outline" onClick={removeColumn}>
          列 -
        </Button>
      </div>
      <Spreadsheet
        data={data}
        columnLabels={columnLabels}
        onChange={(e) => {
          setData(e);
          onChange(parseData(e));
        }}
        hideColumnIndicators={hideColumnIndicators}
        hideRowIndicators={hideRowIndicators}
      />
    </div>
  );
};
