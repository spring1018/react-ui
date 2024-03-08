import type { Meta, StoryObj } from "@storybook/react";
import { CustomSelect } from ".";

type T = typeof CustomSelect;

export default {
  component: CustomSelect,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    options: [
      {
        value: "light",
        label: "Light",
      },
      {
        value: "dark",
        label: "Dark",
      },
    ],
    initialValue: "light",
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
