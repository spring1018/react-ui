import ShowMore from "@/components/atoms/ShowMore";
import Editor from "@/components/molecules/Editor";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TimelineProps {
  userName: string;
  date: string;
  tag: string;
  content: string;
}

export default function Timeline({
  userName,
  date,
  tag,
  content,
}: TimelineProps) {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <Dialog>
          <DialogTrigger>
            <Badge className="hover:cursor-pointer">{tag}</Badge>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>編集</DialogTitle>
            </DialogHeader>
            <DialogDescription>{content}</DialogDescription>
          </DialogContent>
        </Dialog>
        <h2 className="text-sm font-bold">{userName}</h2>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <ShowMore maxHeight="120px">
        <div className="flex pl-4 gap-4">
          <div className="mt-2 border-l-4 border-gray-400" />
          <Editor initialContent={content} />
        </div>
      </ShowMore>
    </div>
  );
}
