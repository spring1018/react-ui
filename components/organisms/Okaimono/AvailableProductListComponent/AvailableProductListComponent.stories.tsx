import type { Meta, StoryObj } from "@storybook/react";

import { AvailableProductListComponent } from ".";

const meta = {
  title: "AvailableProductListComponent",
  component: AvailableProductListComponent,
} satisfies Meta<typeof AvailableProductListComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullOfAvailableProduct: Story = {
  args: {
    availableProducts: [
      { id: 1, category: "くだもの", price: 180, name: "りんご" },
      { id: 2, category: "くだもの", price: 460, name: "なし" },
      { id: 3, category: "くだもの", price: 2300, name: "すいか" },
      { id: 4, category: "やさい", price: 135, name: "きゅうり" },
      { id: 5, category: "やさい", price: 195, name: "きゃべつ" },
      { id: 6, category: "やさい", price: 98, name: "こまつな" },
    ],
  },
};

export const NoAvailableProduct: Story = {
  args: {
    availableProducts: [],
  },
};
