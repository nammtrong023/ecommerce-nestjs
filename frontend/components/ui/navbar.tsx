'use client';
import React, { useState } from 'react';
import { useMiniCartStore } from '@/store/mini-cart-store';
import { useClickOutside } from '@/hook/use-click-outside';
import Search from './search';
import { SearchIcon, ShoppingCart, User } from 'lucide-react';
import Categories from '../categories';
import ProfileAction from '../profile-action';
import { useAuth } from '@/providers/auth-provider';
import { useModalStore } from '@/store/modal-store';
import Logo from '../logo';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { NavSheet } from '../nav-drawer';
import { useCategoriesApi } from '@/api/use-categories-api';

const Navbar = () => {
    const router = useRouter();
    const { currentUser } = useAuth();

    const { onOpenModal } = useModalStore();
    const { allCats } = useCategoriesApi();
    const [searchMobile, setSearchMobile] = useState(false);

    const {
        isOpenMiniCart,
        iconCartRef,
        miniCartRef,
        setIsOpenMiniCart,
        toggleOpenMiniCart,
    } = useMiniCartStore();

    const handleOpenMiniCart = () => {
        toggleOpenMiniCart(isOpenMiniCart);
    };

    useClickOutside({
        isOpen: isOpenMiniCart,
        nodeRef: iconCartRef,
        nodeRef2: miniCartRef,
        setIsOpen: setIsOpenMiniCart,
    });

    if (!allCats) return null;

    return (
        <nav className='flex py-4 h-fit bg-white px-2 lg:px-10 justify-between border-b-2 drop-shadow-sm'>
            <>
                {searchMobile ? (
                    <div className='inline-block md:hidden w-full'>
                        <Search onClose={() => setSearchMobile(false)} />
                    </div>
                ) : (
                    <>
                        <div className='flex items-center lg:gap-x-10 gap-x-3'>
                            <NavSheet categories={allCats} />
                            <Logo />
                            <div className='mx-3 md:flex items-center gap-x-2 hidden'>
                                <Categories categories={allCats} />
                            </div>
                        </div>
                        <div className='flex items-center gap-x-5 lg:gap-x-6 ml-auto'>
                            <div className='hidden md:inline-block'>
                                <Search />
                            </div>
                            <div className='md:hidden flex items-center justify-center gap-x-5'>
                                <SearchIcon
                                    size={23}
                                    className='right-6'
                                    onClick={() => setSearchMobile(true)}
                                />
                                <div
                                    onClick={() => router.push('/cart')}
                                    ref={iconCartRef}
                                >
                                    <ShoppingCart className='cursor-pointer' />
                                </div>
                            </div>
                            <div
                                onClick={handleOpenMiniCart}
                                ref={iconCartRef}
                                className='cursor-pointer hidden md:inline-block'
                            >
                                <ShoppingCart />
                            </div>
                            {!currentUser ? (
                                <div
                                    onClick={() => onOpenModal('auth')}
                                    className='cursor-pointer'
                                >
                                    <User />
                                </div>
                            ) : (
                                <>
                                    <ProfileAction user={currentUser} />
                                    <Link
                                        className='md:hidden'
                                        href={`/profile/${currentUser.id}`}
                                    >
                                        <User />
                                    </Link>
                                </>
                            )}
                        </div>
                    </>
                )}
            </>
        </nav>
    );
};

export default Navbar;
