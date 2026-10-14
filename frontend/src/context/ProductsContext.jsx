import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getProducts } from "../services/api";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      // Ensure only active products are present
      const activeProducts = Array.isArray(data)
        ? data.filter((p) => p.is_active !== false)
        : [];
      setProducts(activeProducts);
    } catch (err) {
      console.warn("Products data fetch notice:", err.message);
      setError("Unable to load this information right now. Please try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        refetchProducts: fetchProductsData,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
