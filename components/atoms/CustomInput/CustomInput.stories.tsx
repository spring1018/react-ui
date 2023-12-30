import type { Meta, StoryObj } from "@storybook/react";
import { CustomInput } from ".";

type T = typeof CustomInput;

export default {
  component: CustomInput,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
