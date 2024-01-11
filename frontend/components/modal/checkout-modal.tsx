import React from 'react';
import StripeCheckoutForm from '../stripe-checkout-form';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { ProductInCart } from '@/types';
import { useModalStore } from '@/store/modal-store';

const pub_key = process.env.NEXT_PUBLIC_STRIPE_KEY;

const stripePromise = loadStripe(pub_key || '');

interface CheckoutModalProps {
    onCheckout: (address: string, phone: string) => void;
    cart: ProductInCart[];
}

export const CheckoutModal = ({ cart, onCheckout }: CheckoutModalProps) => {
    const { type, onClose, isOpenModal } = useModalStore();
    const isOpen = type === 'checkout' && isOpenModal;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className='w-full text-center flex items-center justify-center text-2xl font-semibold'>
                    Thanh toán
                </DialogHeader>

                <Elements stripe={stripePromise}>
                    <StripeCheckoutForm
                        cart={cart}
                        handleClose={onClose}
                        onCheckout={onCheckout}
                    />
                </Elements>
            </DialogContent>
        </Dialog>
    );
};
