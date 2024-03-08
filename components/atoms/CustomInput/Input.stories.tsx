import type { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";

type T = typeof Input;

export default {
	component: Input,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
	args: {
		placeholder: "Placeholder",
		onBlurAction: (value: string) => console.log(value),
	},
};
