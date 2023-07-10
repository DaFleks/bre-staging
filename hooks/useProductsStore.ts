import { create } from "zustand";

const useProductsStore = create((set) => ({
  products: [],
  setProducts: (products:[]) => set((state: any) => ({ products: products })),
}));

export default useProductsStore;
