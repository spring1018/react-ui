import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useState } from "react";

type ViewSwitcherProps = {
  viewMode: string;
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
  viewMode,
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  const [tab, setTab] = useState(viewMode);

  const handleTabChange = (value: string) => {
    setTab(value);
    onViewModeChange(viewOptions[value]);
  };

  return (
    <div className="flex items-center gap-4">
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
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          defaultChecked={isChecked}
          onClick={() => onViewListChange(!isChecked)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          列を表示
        </label>
      </div>
    </div>
  );
};
