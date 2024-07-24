import ControlledSheetForm from "./controlled-sheet-form";
import SheetForm from "./sheet-form";

export default async function Page() {
  return (
    <div className="space-y-4">
      <SheetForm />
      <ControlledSheetForm />
    </div>
  );
}
