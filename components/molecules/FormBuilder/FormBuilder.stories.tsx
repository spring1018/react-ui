import type { Meta, StoryObj } from "@storybook/react";
import { FormBuilder } from ".";

type T = typeof FormBuilder;

const columnDefs = [
	{
		accessorKey: "_",
		title: "",
		componentType: "button",
	},
	{
		accessorKey: "id",
		title: "ID",
	},
	{
		accessorKey: "title",
		title: "Title",
		componentType: "input",
	},
	{
		accessorKey: "status",
		title: "Status",
		componentType: "select",
		params: {
			selectOptions: [
				{
					value: "backlog",
					label: "Backlog",
				},
				{
					value: "todo",
					label: "To Do",
				},
				{
					value: "in progress",
					label: "In Progress",
				},
			],
		},
	},
	{
		accessorKey: "priority",
		title: "Priority",
		componentType: "select",
		params: {
			selectOptions: [
				{
					value: "low",
					label: "Low",
				},
				{
					value: "medium",
					label: "Medium",
				},
				{
					value: "high",
					label: "High",
				},
			],
		},
	},
];

const initialValues = {
	id: "1",
	title:
		"You can't compress the program without quantifying the open-source SSD pixel!",
	status: "in progress",
	priority: "medium",
};

const updateData = async (rowData, id) => {
	try {
		const response = await fetch(`http://localhost:3004/mock-sample/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...rowData }),
		});
	} catch (error) {
		console.error("Error updating data:", error);
	}
};

export default {
	component: FormBuilder,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
	args: {
		columnDefs: columnDefs,
		initialValues: initialValues,
		onSubmit: (values) => {
			updateData(values, values.id);
		},
	},
};
