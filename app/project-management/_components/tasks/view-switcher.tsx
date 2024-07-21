import { Button } from "@/components/ui/button";
import { ViewMode } from "gantt-task-react";
import { useViewMode } from "../hooks/use-viewmode";

type ViewSwitcherProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewListChange,
  isChecked,
}) => {
  const [viewMode, setViewMode] = useViewMode();

  return (
    <div className="flex gap-2">
      {/* <Button
        className="Button"
        onClick={() => setViewMode(ViewMode.Hour)}
      >
        Hour
      </Button>
      <Button
        className="Button"
        onClick={() => setViewMode(ViewMode.QuarterDay)}
      >
        Quarter of Day
      </Button>
      <Button
        className="Button"
        onClick={() => setViewMode(ViewMode.HalfDay)}
      >
        Half of Day
      </Button> */}
      <Button
        variant={"outline"}
        onClick={() => setViewMode({ selected: ViewMode.Day })}
      >
        Day
      </Button>
      <Button
        variant={"outline"}
        onClick={() => setViewMode({ selected: ViewMode.Week })}
      >
        Week
      </Button>
      <Button
        variant={"outline"}
        onClick={() => setViewMode({ selected: ViewMode.Month })}
      >
        Month
      </Button>
      <Button
        variant={"outline"}
        onClick={() => setViewMode({ selected: ViewMode.Year })}
      >
        Year
      </Button>
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
