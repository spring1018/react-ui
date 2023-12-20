import type { Meta, StoryObj } from "@storybook/react";
import { CustomCombobox } from ".";

type T = typeof CustomCombobox;

const options = [
  {
    label: "Light",
    value: "light",
    description: "Light theme",
  },
  {
    label: "Dark",
    value: "dark",
    description: "Dark theme",
  },
];

export default {
  component: CustomCombobox,
  parameters: {
    layout: "centered",
  },
  args: {
    options: options,
    initialValue: "dark",
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
