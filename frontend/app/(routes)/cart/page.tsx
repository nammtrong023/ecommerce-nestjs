'use client';
import { useEffect, useState } from 'react';
import Summary from './components/summary';
import { useCartStore } from '@/store/cart-store';
import { Container } from '@mui/material';
import CartItem from './components/cart-item';
import Empty from '@/components/empty';

const CartPage = () => {
    const { cart } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='bg-white h-full min-h-full'>
            <div className='px-4 py-16 sm:px-6 lg:px-8 w-full'>
                <h1 className='text-3xl font-bold text-black text-center w-full'>
                    Giỏ Hàng
                </h1>
                <div className='mt-12 lg:grid lg:grid-cols-12 gap-x-12 w-full relative'>
                    <div className='lg:col-span-7 w-full'>
                        {cart.length === 0 && (
                            <div className='w-full flex-col items-center justify-center'>
                                <p className='text-neutral-500 text-lg font-medium text-center'>
                                    Không có sản phẩm.
                                </p>
                                <Empty />
                            </div>
                        )}
                        {cart.reverse().map((item, index) => (
                            <CartItem key={item.id} item={item} index={index} />
                        ))}
                    </div>
                    <Summary />
                </div>
            </div>
        </div>
    );
};

export default CartPage;
