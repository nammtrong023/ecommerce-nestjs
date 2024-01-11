'use client';
import { Copyright } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';

const Footer = () => {
    return (
        <footer className='bg-[#fbfbfb] p-6 px-2 sm:px-16 mt-auto w-full'>
            <div className='sm:flex grid grid-cols-2 gap-y-10 item-center mx-auto justify-between items-center'>
                <Logo />
                <div className='flex flex-col gap-y-3 items-center justify-between'>
                    <div className='flex flex-col items-center sm:text-base text-sm'>
                        <p className='flex items-center gap-x-1'>
                            <Copyright /> 2023 Growth eCommerce
                        </p>
                        <p className='mt-2'>
                            Privacy Policy Terms & Conditions
                        </p>
                    </div>
                    <div className='grid-cols-4 gap-2 hidden sm:grid'>
                        <PaymentMethod src='/amex.png' />
                        <PaymentMethod src='/mastercard.png' />
                        <PaymentMethod src='/visa.png' />
                        <PaymentMethod src='/paypal.png' />
                    </div>
                </div>
            </div>
            <div className='grid-cols-4 gap-2 grid sm:hidden mt-5'>
                <PaymentMethod src='/amex.png' />
                <PaymentMethod src='/mastercard.png' />
                <PaymentMethod src='/visa.png' />
                <PaymentMethod src='/paypal.png' />
            </div>
        </footer>
    );
};

function PaymentMethod({ src }: { src: string }): ReactElement {
    return (
        <div className='w-[70px] h-[50px] relative'>
            <Image
                src={src}
                alt='Payment Method'
                fill
                sizes='10vw'
                className='w-auto h-auto'
                placeholder='blur'
                blurDataURL={src}
            />
        </div>
    );
}

function Logo() {
    return (
        <Link href='/' className='flex items-center w-fit h-fit'>
            <Image
                src='/logo.png'
                alt='Growth'
                sizes='10vw'
                width={48}
                height={48}
            />
            <h2 className='text-xl sm:text-2xl font-semibold'>Growth</h2>
        </Link>
    );
}

export default Footer;
