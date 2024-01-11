import React, { ChangeEvent, FormEvent, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { usePaymentService } from '../hook/use-payment-service';
import { Button } from './ui/button';
import { ProductInCart } from '@/types';
import { Input } from './ui/input';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { Label } from './ui/label';

interface StripeCheckoutProps {
    cart: ProductInCart[];
    onCheckout: (address: string, phone: string) => void;
    handleClose: () => void;
}

const StripeCheckoutForm = ({
    cart,
    handleClose,
    onCheckout,
}: StripeCheckoutProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const { handleCheckout } = usePaymentService(cart, 'vnd');

    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);
        const cardElement = elements?.getElement(CardElement);

        try {
            const paymentResponse = await handleCheckout();
            //@ts-ignore
            const paymentMethod = await stripe?.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            const response = await stripe?.confirmCardPayment(
                paymentResponse.data.client_secret,
                {
                    payment_method: paymentMethod?.paymentMethod?.id,
                },
            );

            onCheckout(address, phone);

            if (response?.error) {
                setIsLoading(false);
                toast.error('Thanh toán thất bại');
                return;
            }

            toast.success('Thành công');
            setIsLoading(false);
            handleClose();
        } catch (err) {
            setIsLoading(false);
            toast.error('Thanh toán thất bại');
        }
    };

    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');

        setPhone(numericValue);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <Label className='flex items-center gap-x-1'>
                Số thẻ
                <p className='text-muted-foreground/70'>
                    (Nhập 4242 đến hết cho demo)
                </p>
            </Label>
            <div className='w-full border p-1 rounded-lg h-[40px]'>
                <CardElement
                    onChange={(e) => setIsValid(e.complete)}
                    options={{
                        hidePostalCode: true,
                        style: {
                            base: {
                                color: 'black',
                                lineHeight: '30px',
                                fontSize: '14px',
                                '::placeholder': {
                                    color: 'black',
                                    fontSize: '14px',
                                },
                            },
                        },
                    }}
                />
            </div>
            <div className='space-y-2'>
                <Label>Điện thoại</Label>
                <Input
                    placeholder='Điện thoại'
                    type='text'
                    value={phone}
                    maxLength={10}
                    onChange={handlePhoneChange}
                    className='focus-visible:ring-0 focus-visible:ring-offset-0'
                />
            </div>
            <div className='space-y-2'>
                <Label>Địa chỉ</Label>
                <Input
                    value={address}
                    placeholder='Địa chỉ'
                    onChange={(e) => setAddress(e.target.value)}
                    className='focus-visible:ring-0 focus-visible:ring-offset-0'
                />
            </div>
            <Button
                type='submit'
                className='w-full'
                disabled={!isValid || !phone || !address || isLoading}
            >
                {isLoading && <Loader2 className='animate-spin mr-2' />}
                Thanh toán
            </Button>
        </form>
    );
};

export default StripeCheckoutForm;
