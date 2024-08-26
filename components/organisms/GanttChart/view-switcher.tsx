import { MultiSelect } from "@/components/molecules/MultiSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useState } from "react";

type ViewSwitcherProps = {
  viewMode: string;
  isChecked: boolean;
  onlyParentTasks: boolean;
  setSearchText: (searchText: string) => void;
  filterStatuses: string[];
  setFilterStatuses: (filterStatuses: string[]) => void;
  setOnlyParentTasks: (onlyParentTasks: boolean) => void;
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
  isChecked,
  onlyParentTasks,
  setSearchText,
  filterStatuses,
  setFilterStatuses,
  setOnlyParentTasks,
  onViewModeChange,
  onViewListChange,
}) => {
  const [tab, setTab] = useState(viewMode);

  const handleTabChange = (value: string) => {
    setTab(value);
    onViewModeChange(viewOptions[value]);
  };

  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex basis-3/4 items-center space-x-4">
        <Input
          type="text"
          placeholder="タイトルを検索"
          className="w-[250px] h-11"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="w-[320px]">
          <MultiSelect
            options={[
              { label: "完了", value: "done" },
              { label: "進行中", value: "in progress" },
              { label: "未着手", value: "todo" },
            ]}
            placeholder="ステータスを選択"
            selected={filterStatuses}
            onChange={(value) => setFilterStatuses(value)}
          />
        </div>
        <div className="flex space-x-2">
          <Checkbox
            id="onyParentTasks"
            defaultChecked={onlyParentTasks}
            onClick={() => setOnlyParentTasks(!onlyParentTasks)}
          />
          <label
            htmlFor="onyParentTasks"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            親タスクのみ表示
          </label>
        </div>
        <div className="flex space-x-2">
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
    </div>
  );
};
