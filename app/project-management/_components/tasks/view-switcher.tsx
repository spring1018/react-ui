import { ViewMode } from "gantt-task-react";
import { useViewMode } from "../hooks/use-viewmode";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
};

// Other options: ViewMode.Hour, ViewMode.QuarterDay, ViewMode.HalfDay
const viewOptions: { [key: string]: ViewMode } = {
  Day: ViewMode.Day,
  Week: ViewMode.Week,
  Month: ViewMode.Month,
  Year: ViewMode.Year,
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewListChange,
  isChecked,
}) => {
  const [viewMode, setViewMode] = useViewMode();
  const [tab, setTab] = useState("Month");

  const handleValueChange = (value: string) => {
    setViewMode({ selected: viewOptions[value] });
    setTab(value);
  };

  return (
    <div className="flex gap-2">
      <Tabs value={tab} onValueChange={handleValueChange}>
        <TabsList>
          <TabsTrigger value="Day">Day</TabsTrigger>
          <TabsTrigger value="Week">Week</TabsTrigger>
          <TabsTrigger value="Month">Month</TabsTrigger>
          <TabsTrigger value="Year">Year</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div>
    </div>
  );
};
