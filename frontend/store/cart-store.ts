import { ProductInCart, ProductType } from '@/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type SelectedValue = {
    size: string | null;
    color: string | null;
};

interface ICartState {
    cart: ProductInCart[];
    totalPrice: number;
    selectedValue: SelectedValue;
    setTotalPrice: (state: number) => void;
    addCartItem: (product: ProductType, productId: string, id: string) => void;
    removeAll: () => void;
    removeFromCart: (id: string) => void;
    changeQuantityValue: (id: string, quantity: number) => void;
    setSelectedValue: (value: SelectedValue) => void;
}

export const useCartStore = create<ICartState>()(
    persist(
        (set, get) => ({
            cart: [],
            totalPrice: 0,
            selectedValue: {
                color: null,
                size: null,
            },

            setTotalPrice: (state) => set({ totalPrice: state }),
            addCartItem: (product, productId, id) => {
                const { cart, selectedValue } = get();
                const updatedCart = [...cart];

                const newItem: ProductInCart = {
                    ...product,
                    id,
                    productId,
                    size: selectedValue.size,
                    color: selectedValue.color,
                    quantity: 1,
                };

                const hasProducts = cart.filter(
                    (product) => product.productId === productId,
                );

                const findedProduct = hasProducts.find((product) => {
                    if (!newItem.color || !newItem.size) return;

                    const matchSize = product?.size?.includes(newItem.size);
                    const matchColor = product?.color?.includes(newItem.color);

                    if (matchSize && matchColor) return product;
                });

                if (findedProduct) {
                    findedProduct.quantity += 1;
                } else {
                    updatedCart.push(newItem);
                }

                set({ cart: updatedCart });
            },

            removeFromCart: (id) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== id),
                })),

            removeAll: () => set({ cart: [] }),

            setSelectedValue: (state) =>
                set({
                    selectedValue: state,
                }),

            changeQuantityValue: (id, quantity) => {
                set((state) => {
                    const { cart } = state;

                    const cartItem = cart.find((item) => {
                        return item.id === id;
                    });

                    if (cartItem) {
                        const newCart = [...cart].map((item) => {
                            if (item.id === id) {
                                return { ...item, quantity: quantity };
                            }

                            return item;
                        });

                        return { cart: newCart };
                    }
                    return state;
                });
            },
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
