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

const DialogWrapper = ({
	open,
	setOpen,
	title,
	children,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	children?: React.ReactNode;
}) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent onInteractOutside={() => setOpen(false)}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{title}</DialogDescription>
				</DialogHeader>
				{children ? children : <DialogDescription>foo</DialogDescription>}
			</DialogContent>
		</Dialog>
	);
};

interface TimelineItemProps {
	id: string;
	userName: string;
	date: Date;
	tag: string;
	content: string;
	children?: React.ReactNode;
}

const TimelineItem = ({
	id,
	userName,
	date,
	tag,
	content,
	children,
}: TimelineItemProps) => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<DialogWrapper open={open} setOpen={setOpen} title="活動">
				{children}
			</DialogWrapper>
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

export const Timeline = ({
	items,
	children,
}: {
	items: TimelineItemProps[];
	children?: React.ReactNode;
}) => {
	return (
		<div className="space-y-4">
			{items.map((item, index) => (
				<TimelineItem key={item.id} {...item}>
					{Array.isArray(children) ? children[index] : children}
				</TimelineItem>
			))}
		</div>
	);
};
