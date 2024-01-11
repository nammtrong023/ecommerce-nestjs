'use client';

import { useCartStore } from '@/store/cart-store';
import { ArrowRight } from 'lucide-react';
import MiniCartItem from './mini-cart-item';
import { Button } from '../ui/button';
import { IconButton } from '@mui/material';
import { useMiniCartStore } from '@/store/mini-cart-store';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useModalStore } from '@/store/modal-store';
import { useRouter } from 'next/navigation';

const MiniCart = () => {
    const router = useRouter();
    const { cart } = useCartStore();

    const { onClose } = useModalStore();
    const [mounted, setMounted] = useState(false);

    const { isOpenMiniCart, miniCartRef, setIsOpenMiniCart } =
        useMiniCartStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    const goToCart = () => {
        setIsOpenMiniCart(false);
        router.push('/cart');
        onClose();
    };

    if (!mounted) return null;

    return (
        <div
            className={cn(
                'w-[22vw] bg-white top-[100px] h-fit right-10 rounded-xl fixed min-h-[20vh] shadow-2xl py-5 transition-opacity ease-linear z-30 opacity-0',
                isOpenMiniCart ? 'opacity-100' : 'pointer-events-none',
            )}
            ref={miniCartRef}
        >
            <div className='flex items-center justify-between shadow-bottom px-4'>
                <h2 className='font-bold text-lg text-text1'>
                    Giỏ hàng ({cart.length})
                </h2>
                <IconButton
                    className='cursor-pointer inline-block rounded-full p-2'
                    onClick={() => setIsOpenMiniCart(false)}
                >
                    <ArrowRight className='w-6 h-6' />
                </IconButton>
            </div>
            <div className='pt-3 px-4 pb-5 max-h-[450px] overflow-y-auto'>
                <MiniCartItem />
            </div>
            {cart.length > 0 && (
                <div className='flex items-center justify-between text-text1 pt-5 pr-5 drop-shadow-2xl font-semibold min-h-[36px] text-lg pb-1'>
                    <Button
                        className='ml-auto px-10 text-center'
                        onClick={goToCart}
                    >
                        Xem giỏ hàng
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MiniCart;
