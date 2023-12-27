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
  {
    label: "Blueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    value: "blue",
    description: "Blue theme",
  },
  {
    label: "Red",
    value: "red",
    description: "Red theme",
  },
  {
    label: "Green",
    value: "green",
    description: "Green theme",
  },
  {
    label: "Yellow",
    value: "yellow",
    description: "Yellow theme",
  },
  {
    label: "Purple",
    value: "purple",
    description: "Purple theme",
  },
  {
    label: "Gray",
    value: "gray",
    description: "Gray theme",
  },
  {
    label: "Pink",
    value: "pink",
    description: "Pink theme",
  },
  {
    label: "Orange",
    value: "orange",
    description: "Orange theme",
  }
];

export default {
  component: CustomCombobox,
  args: {
    options: options,
    initialValue: "dark",
  },
} satisfies Meta<T>;

export const ShortOptions: StoryObj<T> = {
  args: {
    options: options.slice(0, 3),
  },
};

export const LongOptions: StoryObj<T> = {
  args: {
    options: options,
  },
};

