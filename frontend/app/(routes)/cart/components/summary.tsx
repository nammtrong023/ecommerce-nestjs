'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { formatMoney } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useModalStore } from '@/store/modal-store';
import { useMutation } from '@tanstack/react-query';
import { useOrdersApi } from '@/api/use-orders-api';
import { CheckoutModal } from '@/components/modal/checkout-modal';

const Summary = () => {
    const { currentUser } = useAuth();
    const { createOrder } = useOrdersApi();
    const searchParams = useSearchParams();

    const { onOpenModal } = useModalStore();
    const { cart, totalPrice, setTotalPrice, removeAll } = useCartStore();

    useEffect(() => {
        const handleTotalPrice = () => {
            const total = cart.reduce((total, item) => {
                return total + Number(item.price) * Number(item.quantity);
            }, 0);

            setTotalPrice(total);
        };

        handleTotalPrice();
    }, [cart, setTotalPrice]);

    const { mutate } = useMutation({
        mutationFn: (data: any) => createOrder(data),
        onSuccess: () => removeAll(),
        onError: (error) => {
            toast.error('Something went wrong.');
        },
    });

    const handleOpenModal = () => {
        if (!currentUser) {
            return onOpenModal('auth');
        }

        return onOpenModal('checkout');
    };

    const onCheckout = async (address: string, phone: string) => {
        const orderItems = cart.map((product) => {
            const {
                id,
                category,
                productId,
                createdAt,
                images,
                name,
                desc,
                ...productDetail
            } = product;

            return {
                productId: productId,
                size: productDetail.size,
                color: productDetail.color,
                quantity: productDetail.quantity,
                price: productDetail.price,
            };
        });

        const data = {
            userId: currentUser?.id,
            address,
            phone,
            total: totalPrice,
            orderItems,
        };

        mutate(data);
    };

    return (
        <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 h-fit lg:mt-0 lg:p-8'>
            <CheckoutModal cart={cart} onCheckout={onCheckout} />

            <h2 className='text-2xl font-semibold text-gray-900 text-center'>
                Đơn Hàng
            </h2>
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                    <div className='text-base font-medium text-gray-900'>
                        Tổng tiền
                    </div>
                    <span>{formatMoney(totalPrice)}</span>
                </div>
            </div>
            <Button
                disabled={cart.length === 0}
                onClick={handleOpenModal}
                className='w-full mt-6'
            >
                Thanh toán
            </Button>
        </div>
    );
};

export default Summary;
