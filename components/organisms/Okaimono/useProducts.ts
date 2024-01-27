"use client";
import { useState } from "react";

type UseProductsResult = {
  availableProducts: AvailableProducts;
  stockedProducts: StockedProducts;
  handleAddProduct: (productId: ProductId) => void;
  handleReturnProduct: (productId: ProductId) => void;
  handleClearProduct: () => void;
};

export type ProductId = number;

export type Product = {
  id: ProductId;
  category: string;
  price: number;
  name: string;
};

export type AvailableProducts = Product[];

export type StockedProducts = Product[];

export const useProducts = (): UseProductsResult => {
  const [stockedProductIdList, setStockedProductIdList] = useState<ProductId[]>(
    []
  );

  const productList: Product[] = [
    { id: 1, category: "くだもの", price: 180, name: "りんご" },
    { id: 2, category: "くだもの", price: 460, name: "なし" },
    { id: 3, category: "くだもの", price: 2300, name: "すいか" },
    { id: 4, category: "やさい", price: 135, name: "きゅうり" },
    { id: 5, category: "やさい", price: 195, name: "きゃべつ" },
    { id: 6, category: "やさい", price: 98, name: "こまつな" },
  ]; // get by API

  const availableProducts: AvailableProducts = productList.filter(
    (product) => !stockedProductIdList.includes(product.id)
  );

  const stockedProducts: StockedProducts = productList.filter((product) =>
    stockedProductIdList.includes(product.id)
  );

  const handleAddProduct = (productId: ProductId) => {
    console.log("handleAddProduct", productId);
    setStockedProductIdList([...stockedProductIdList, productId]);
  };

  const handleReturnProduct = (productId: ProductId) => {
    setStockedProductIdList(
      stockedProductIdList.filter((id) => id !== productId)
    );
  };

  const handleClearProduct = () => {
    setStockedProductIdList([]);
  };

  return {
    availableProducts,
    stockedProducts,
    handleAddProduct,
    handleReturnProduct,
    handleClearProduct,
  };
};
