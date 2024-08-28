"use client";
import ShowMore from "@/components/atoms/ShowMore";
import Editor from "@/components/molecules/Editor";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimelineItemProps {
  id: string;
  userName: string;
  date: Date;
  tag: string;
  content: string;
  DialogContentComponent?: React.ComponentType;
}

const TimelineItem = ({
  id,
  userName,
  date,
  tag,
  content,
  DialogContentComponent,
}: TimelineItemProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <TimelineItemDialog
        open={open}
        setOpen={setOpen}
        DialogContentComponent={DialogContentComponent}
      />
      <div className="flex gap-4 items-center" onClick={() => setOpen(true)}>
        <Badge>{tag}</Badge>
        <h2 className="text-sm font-bold">{userName}</h2>
        <p className="text-sm text-gray-500">{date.toLocaleString()}</p>
      </div>
      <ShowMore maxHeight="120px">
        <div className="flex pl-4 gap-4" onClick={() => setOpen(true)}>
          <div className="mt-2 border-l-4 border-gray-400" />
          <Editor initialContent={content} />
        </div>
      </ShowMore>
    </div>
  );
};

const TimelineItemDialog = ({ open, setOpen, DialogContentComponent }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>活動</DialogTitle>
        </DialogHeader>
        {DialogContentComponent ? (
          <DialogContentComponent />
        ) : (
          <DialogDescription>foo</DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  );
};

export const Timeline = ({ items }: { items: TimelineItemProps[] }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <TimelineItem key={item.id} {...item} />
      ))}
    </div>
  );
};
