'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCategoriesApi } from '@/api/use-categories-api';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const CatBanner = () => {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    const { allCats } = useCategoriesApi();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!allCats || !isMounted) return null;

    const sliceCat = allCats.slice(0, 3).reverse();

    return (
        <div className='max-w-5xl mx-auto h-full'>
            <div className='grid-container w-full h-full'>
                {sliceCat.map((item) => (
                    <div
                        key={item.id}
                        className='item w-full relative h-[300px] md:h-[450px] lg:h-[500px]'
                    >
                        <Image
                            fill
                            src={item.image}
                            alt='Category Banner'
                            className='object-cover'
                        />
                        <Button
                            className='absolute bottom-10 left-1/2 -translate-x-1/2 min-w-[84px] capitalize bg-slate-100 hover:bg-slate-100/90 text-black'
                            onClick={() =>
                                router.push(`/categories/${item.id}`)
                            }
                        >
                            {item.name}
                        </Button>
                    </div>
                ))}
            </div>
            <div className='w-full h-[126px] relative mt-5'>
                <Image
                    fill
                    src='/all-product.png'
                    alt='Category Banner'
                    className='object-cover'
                />
                <Button
                    className='absolute bottom-10 left-1/2 -translate-x-1/2 min-w-[84px] capitalize bg-slate-100 hover:bg-slate-100/90 text-black'
                    onClick={() => router.push('/products')}
                >
                    Xem tất cả
                </Button>
            </div>
        </div>
    );
};

export default CatBanner;
