import { FormBuilder } from "../FormBuilder";
import { Sheet } from "../Sheet";

type FormSheetButtonProps = {
  headerText?: string;
  columnDefs: any;
  initialValues?: any;
  handleSubmit?: any;
};

export const FormSheetButton = ({
  headerText = "Edit",
  columnDefs,
  initialValues = {},
  handleSubmit = () => {},
}: FormSheetButtonProps) => {
  return (
    <Sheet
      text={headerText}
      children={
        <FormBuilder
          columnDefs={columnDefs}
          initialValues={initialValues}
          openedInSheet={true}
          onSubmit={handleSubmit}
        />
      }
    />
  );
};
