'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    const isHome = pathname === '/';

    const [isMounted, setIsMounted] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const shouldShowHeader = scrollPosition > 50;

            setIsScrolled(shouldShowHeader);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!isMounted) return null;

    const headerClass = isScrolled
        ? 'fixed opacity-100 top-0 z-50 right-0 left-0 transition-opacity ease-in-out delay-300'
        : 'opacity-0 pointer-events-none w-0 h-0';

    return (
        <header
            className={isHome ? headerClass : 'fixed top-0 z-30 right-0 left-0'}
        >
            <Navbar />
        </header>
    );
};

export default Header;
