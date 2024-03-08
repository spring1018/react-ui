import type { Meta, StoryObj } from "@storybook/react";
import { SampleTableComponent } from ".";

type T = typeof SampleTableComponent;

export default {
	component: SampleTableComponent,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	args: {
		data: [
			{
				invoice: "INV001",
				paymentStatus: "Paid",
				totalAmount: "$250.00",
				paymentMethod: "Credit Card",
			},
			{
				invoice: "INV002",
				paymentStatus: "Pending",
				totalAmount: "$150.00",
				paymentMethod: "PayPal",
			},
			{
				invoice: "INV003",
				paymentStatus: "Unpaid",
				totalAmount: "$350.00",
				paymentMethod: "Bank Transfer",
			},
		],
	},
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
