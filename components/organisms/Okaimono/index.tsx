"use client";
import { FC } from "react";
import { AvailableProductListComponent } from "./AvailableProductListComponent";
import { StockedProductListComponent } from "./StockedProductListComponent";
import { useProducts } from "./useProducts";

export const OkaimonoComponent: FC = () => {
  const {
    availableProducts,
    stockedProducts,
    handleAddProduct,
    handleClearProduct,
    handleReturnProduct,
  } = useProducts();

  return (
    <>
      <AvailableProductListComponent
        availableProducts={availableProducts}
        onAddProduct={handleAddProduct}
        onClearProduct={handleClearProduct}
      />
      <StockedProductListComponent
        stockedProducts={stockedProducts}
        onReturnProduct={handleReturnProduct}
      />
    </>
  );
};
