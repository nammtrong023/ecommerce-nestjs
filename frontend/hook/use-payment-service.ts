'use client';

import useAxiosPrivate from '@/hook/use-axios-private';
import { ProductInCart } from '@/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const usePaymentService = (cart: ProductInCart[], currency: string) => {
    const axiosPrivate = useAxiosPrivate();

    const products = cart.map((item) => {
        return {
            item: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        };
    });

    const handleCheckout = async () => {
        return await axiosPrivate.post(`${baseUrl}/payments`, {
            products: products,
            currency: currency,
        });
    };

    return { handleCheckout };
};
