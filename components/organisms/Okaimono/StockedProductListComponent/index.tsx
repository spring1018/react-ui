import { FC } from "react";

type ProductId = number;

type Product = {
  id: ProductId;
  category: string;
  price: number;
  name: string;
};

type StockedProducts = Product[];

type StockedProductListComponentProps = {
  stockedProducts: StockedProducts;
  onReturnProduct: (productId: ProductId) => void;
};

export const StockedProductListComponent: FC<
  StockedProductListComponentProps
> = ({ stockedProducts, onReturnProduct }) => {
  const totalAmount = stockedProducts.reduce(
    (total, value) => total + value.price,
    0
  );

  return (
    <>
      <div>カゴの中の商品</div>
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>価格</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {stockedProducts.map((stocked) => {
            return (
              <tr key={stocked.id}>
                <td>{stocked.name}</td>
                <td>{stocked.price}</td>
                <td>
                  <button
                    style={{ padding: 0, background: "gray" }}
                    onClick={() => {
                      onReturnProduct(stocked.id);
                    }}
                  >
                    カゴに戻す
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>合計: {totalAmount}円</p>
    </>
  );
};
