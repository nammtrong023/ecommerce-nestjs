'use client';
import NotFoundIcon from '@/components/not-found-icon';
import ProductListSkeleton from '@/components/skeleton/product-list-skeleton';
import Pagination from '@/components/ui/pagination';
import { ProductType } from '@/types';
import React from 'react';

interface SearchItemsProps {
    isLoading: boolean;
    query: string | null;
    products: ProductType[];
}

const SearchItems: React.FC<SearchItemsProps> = ({
    products,
    query,
    isLoading,
}) => {
    return (
        <div className='mt-16 gap-x-5 p-3 md:p-10 w-full'>
            <h1 className='text-text1 font-medium text-xl mb-10'>
                Tìm kiếm sản phẩm cho: {`"${query || ' '}"`}
            </h1>
            {isLoading && <ProductListSkeleton />}

            {!isLoading && products.length === 0 && (
                <div className='flex flex-col items-center justify-center mt-10 w-full'>
                    <NotFoundIcon />
                    <p className='text-black mt-2 text-base font-medium'>
                        Không tìm thấy sản phẩm
                    </p>
                </div>
            )}

            {!isLoading && products.length > 0 && (
                <div className='flex-1'>
                    <Pagination
                        products={products}
                        className='gap-x-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                    />
                </div>
            )}
        </div>
    );
};

export default SearchItems;
