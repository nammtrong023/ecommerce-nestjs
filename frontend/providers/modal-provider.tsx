'use client';
import { AuthModal } from '@/components/modal/auth-modal';
import MiniCart from '@/components/cart/mini-cart';
import PreviewModal from '@/components/modal/preview-modal';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <PreviewModal />
            <MiniCart />
            <AuthModal />
        </>
    );
};

export default ModalProvider;
