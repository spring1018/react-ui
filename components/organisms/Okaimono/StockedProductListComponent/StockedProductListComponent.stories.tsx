import type { Meta, StoryObj } from "@storybook/react"
import { StockedProductListComponent } from "."


const meta = {
  title: "StockedProductListComponent",
  component: StockedProductListComponent,
} satisfies Meta<typeof StockedProductListComponent>

export default meta
type Story = StoryObj<typeof meta>

export const StockedNoProduct: Story = {
  args: {
    stockedProducts: [],
  },
}

export const StockedSomeProducts: Story = {
  args: {
    stockedProducts: [
      { id: 1, category: "くだもの", price: 180, name: "りんご" },
      { id: 2, category: "くだもの", price: 460, name: "なし" },
      { id: 3, category: "くだもの", price: 2300, name: "すいか" },
    ],
  },
}
