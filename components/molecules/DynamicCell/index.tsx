import { Input } from "@/components/atoms/CustomInput";
import { Combobox } from "@/components/ui/combobox";

type DynamicCellProps = {
  componentType: string;
  initialValue: string;
  options: any;
  handleChange: any;
};

export const DynamicCell = ({
  componentType,
  initialValue,
  options,
  handleChange,
}: DynamicCellProps) => {
  switch (componentType) {
    case "label":
      return (
        <div className="flex max-w-[500px] h-4 items-center">
          <p className="truncate ...">{initialValue}</p>
        </div>
      );
    case "input":
      return (
        <Input
          className="border-0"
          initialValue={initialValue}
          onBlurAction={handleChange}
        />
      );
    case "select":
      return (
        <Combobox
          className="w-[200px] justify-between border-0"
          options={options}
          initialValue={initialValue}
          onChange={handleChange}
        />
      );
  }
};
