import { create } from 'zustand';
import { Product } from '~/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface CartState {
  products: Array<Product & { quantity: number; productColor?: string; productSize?: string }>;
  addProduct: (product: Product, selectedSize: string, selectedColor: string) => void;
  reduceProduct: (product: Product) => void;
  clearCart: () => void;
  items: number;
  totalPrice: number;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      items: 0,
      totalPrice: 0,

      addProduct: (product: Product, selectedSize: string, selectedColor: string) => {
        const { products, items, totalPrice } = get();
        const existingProduct = products.find((p) => p.id === product.id);
        console.log('from cartstoe', selectedSize, selectedColor);

        if (existingProduct) {
          set({
            products: products.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
            items: items + 1,
            totalPrice: totalPrice + product.price,
          });
        } else {
          set({
            products: [
              ...products,
              { ...product, quantity: 1, productColor: selectedColor, productSize: selectedSize },
            ],
            items: items + 1,
            totalPrice: totalPrice + product.price,
          });
        }
      },

      reduceProduct: (product: Product) => {
        const { products, items, totalPrice } = get();
        const existingProduct = products.find((p) => p.id === product.id);

        if (existingProduct) {
          if (existingProduct.quantity > 1) {
            set({
              products: products.map((p) =>
                p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
              ),
              items: items - 1,
              totalPrice: totalPrice - product.price,
            });
          } else {
            set({
              products: products.filter((p) => p.id !== product.id),
              items: items - 1,
              totalPrice: totalPrice - product.price,
            });
          }
        }
      },

      clearCart: () => {
        set({
          products: [],
          items: 0,
          totalPrice: 0,
        });
      },
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useCartStore;
