import React from 'react';
import { ProductType } from '@/types';
import ProductCard from './product-card';

interface ProductListProps {
    title: string;
    items: ProductType[] | undefined;
}
const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
    return (
        <div className='my-4 mx-auto w-full'>
            <h3 className='font-bold text-2xl w-full text-center'>{title}</h3>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-5 items-center justify-between mx-auto overflow-hidden w-full text-center mt-5'>
                {items?.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
