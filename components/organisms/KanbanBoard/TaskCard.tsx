"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { ColumnId } from "./index";

export interface Task {
  id: UniqueIdentifier;
  columnId: ColumnId;
  content: string;
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  onTitleClick?: () => void;
  cardContent?: (task: Task) => React.ReactNode;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({
  task,
  isOverlay,
  onTitleClick,
  cardContent,
}: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
      {...attributes}
      {...listeners}
      onClick={() => onTitleClick?.(task)}
    >
      {cardContent ? (
        cardContent(task)
      ) : (
        <>
          <CardHeader className="px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative">
            {task.title}
            <Badge variant={"outline"} className="ml-auto font-semibold">
              Task
            </Badge>
          </CardHeader>
          <CardContent className="px-3 pt-3 pb-6 text-left whitespace-pre-wrap">
            {task.description}
          </CardContent>
        </>
      )}
    </Card>
  );
}
