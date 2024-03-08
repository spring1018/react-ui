import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from ".";

type T = typeof NavBar;

const items = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "About",
		href: "/about",
	},
	{
		title: "Contact",
		href: "/contact",
	},
];

export default {
	component: NavBar,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
	args: {
		items: items,
	},
};
