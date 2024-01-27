'use client';
import { FC, useState } from "react";

export type ProductId = number;

export type Product = {
  id: ProductId;
  category: string;
  price: number;
  name: string;
};

export type AvailableProducts = Product[];

type AvailableProductListComponentProps = {
  availableProducts: AvailableProducts;
  onAddProduct: (productId: ProductId) => void;
  onClearProduct: () => void;
};

export const AvailableProductListComponent: FC<
  AvailableProductListComponentProps
> = ({ availableProducts, onAddProduct, onClearProduct }) => {
  const [currentProductId, setCurrentProductId] = useState<
    ProductId | undefined
  >(undefined);

  return (
    <>
      <div>商品リスト</div>
      {availableProducts.length > 0 ? (
        <div>
          <select
            onChange={(e) => {
              setCurrentProductId(Number(e.target.value));
            }}
          >
            <option>---</option>
            {availableProducts.map((product) => {
              return (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              );
            })}
          </select>
          <button
            color="blue"
            onClick={() => {
              if (currentProductId !== undefined) {
                onAddProduct(currentProductId);
              }
            }}
          >
            追加
          </button>
        </div>
      ) : (
        <div>
          <p>選択可能な商品はありません</p>
          <button
            title="すべてクリア"
            color="red"
            onClick={() => {
              onClearProduct();
              setCurrentProductId(undefined);
            }}
          />
        </div>
      )}
    </>
  );
};
