import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ProductSkeleton from '@/components/skeleton/product-skeleton';

const Loading = () => {
    return (
        <div className='w-full h-screen'>
            <Skeleton className='w-full h-full' />
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                {Array.from({ length: 4 }, (_, index) => (
                    <ProductSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default Loading;
