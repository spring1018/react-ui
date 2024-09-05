import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ActivityForm from "./activity-form";

export const ActivityFormDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>活動を追加</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>活動</DialogTitle>
        </DialogHeader>
        <ActivityForm />
      </DialogContent>
    </Dialog>
  );
};
