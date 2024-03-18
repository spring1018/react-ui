import type { Meta, StoryObj } from "@storybook/react";
import { Table } from '.';

type T = typeof Table

export default {
  component: Table,
} satisfies Meta<T>;

export const Default: StoryObj<T> = {};
