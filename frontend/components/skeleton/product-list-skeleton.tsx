import ProductSkeleton from '@/components/skeleton/product-skeleton';
import React from 'react';

const ProductListSkeleton = () => {
    return (
        <div className='w-full h-full py-10'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {Array.from({ length: 4 }, (_, index) => (
                    <ProductSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default ProductListSkeleton;
