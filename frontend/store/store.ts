import { create } from "zustand";
import { Product } from "~/types";

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
  totalPrice:number;
}

const useCartStore = create<CartState>((set) => ({
  products: [],
  items: 0,
  totalPrice:0,

  addProduct: (product: Product) =>
    set((state) => {
      state.items++;
      state.totalPrice=state.totalPrice+product.price
      const hasProduct = state.products.find((p) => p.id === product.id);
      if (hasProduct) {
        // Increase quantity if the product already exists
        return {
          products: state.products.map((p) => {
            if (p.id === hasProduct.id) {
              return { ...p, quantity: p.quantity + 1 };
            }
            return p;
          }),
        };
      } else {
        // Add new product to the cart
        return {
          products: [...state.products, { ...product, quantity: 1 }],
        };
      }
    }),

  reduceProduct: (product: Product) =>
    set((state) => {
      state.items--;
      state.totalPrice =state.totalPrice- product.price;
      const hasProduct = state.products.find((p) => p.id === product.id);
      if (hasProduct && hasProduct?.quantity > 1) {
        // Decrease quantity if it's greater than 1
        return {
          products: state.products.map((p) => {
            if (p.id === hasProduct.id) {
              return { ...p, quantity: p.quantity - 1 };
            }
            return p;
          }),
        };
      } else {
        // Remove product from the cart if quantity reaches 0
        return {
          products: state.products.filter((p) => p.id !== product.id),
          items: state.items - 1,
        };
      }
    }),
  clearCart: () =>
    set((state) => {
      return {
        items: 0,
        totalPrice:0,
        products: [],
      };
    }),
}));

export default useCartStore
