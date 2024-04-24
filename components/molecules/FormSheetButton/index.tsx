import { FormBuilder } from "../FormBuilder";
import { Sheet } from "../Sheet";

type FormSheetButtonProps = {
  headerText?: string;
  columnDefs: any;
  initialValues?: { [key: string]: string };
  handleSubmit?: () => void;
  handleDelete?: () => void;
};

export const FormSheetButton = ({
  headerText = "Edit",
  columnDefs,
  initialValues = {},
  handleSubmit = () => {},
  handleDelete = () => {},
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
          onDelete={handleDelete}
        />
      }
    />
  );
};
