import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useState } from "react";

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

// Other options: ViewMode.Hour, ViewMode.QuarterDay, ViewMode.HalfDay
const viewOptions: { [key: string]: ViewMode } = {
  Day: ViewMode.Day,
  Week: ViewMode.Week,
  Month: ViewMode.Month,
  Year: ViewMode.Year,
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  const [tab, setTab] = useState("Month");

  const handleTabChange = (value: string) => {
    setTab(value);
    onViewModeChange(viewOptions[value]);
  };

  return (
    <div className="ViewContainer">
      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger className="w-12" value="Day">
            日
          </TabsTrigger>
          <TabsTrigger className="w-12" value="Week">
            週
          </TabsTrigger>
          <TabsTrigger className="w-12" value="Month">
            月
          </TabsTrigger>
          <TabsTrigger className="w-12" value="Year">
            年
          </TabsTrigger>
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
