import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PastableTable } from ".";
type T = typeof PastableTable;

const initialData = [
  [{ value: "Vanilla" }, { value: "Chocolate" }, { value: "" }],
  [{ value: "Strawberry" }, { value: "Cookies" }, { value: "" }],
];

const columnLabels = ["Flavor", "Topping", "Price"];

export default {
  component: PastableTable,
  args: {
    columnLabels,
    hideColumnIndicators: true,
    hideRowIndicators: true,
  },
} satisfies Meta<T>;

export const Default: StoryObj<T> = {
  render: function Comp({ ...args }) {
    const [data, setData] = useState(initialData);

    return (
      <PastableTable
        {...args}
        data={data}
        setData={setData}
        onChange={(e) => {
          console.log(e);
        }}
      />
    );
  },
};
