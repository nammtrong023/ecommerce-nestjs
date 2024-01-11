'use client';

import Image from 'next/image';
import React, { MouseEventHandler, useState } from 'react';
import ProductSkeleton from '../skeleton/product-skeleton';
import { Expand } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';
import { cn, formatMoney } from '@/lib/utils';
import { useModalStore } from '@/store/modal-store';
import { ProductType } from '@/types';

const ProductCard = ({
    item,
    salePercentage,
}: {
    item: ProductType;
    salePercentage?: number;
}) => {
    const router = useRouter();
    const [hovered, setHovered] = useState(false);
    const { onOpenModal } = useModalStore();

    const handleSalePrice = (price: number) => {
        if (!salePercentage) return;

        const salePrice = ((100 - salePercentage) / 100) * price;
        return salePrice;
    };

    const handleClick = () => {
        router.push(`/products/${item.id}`);
    };

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        onOpenModal('preview', item);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div
            className='h-fit w-[140px] sm:w-[220px] xl:w-[250px] group rounded-lg inline-block mb-10 shadow rounded-t-xl mx-auto cursor-pointer'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='aspect-square relative w-full h-[190px] sm:h-[290px] xl:h-[320px]'>
                <Image
                    src={item?.images[0].url}
                    alt={item?.name}
                    fill
                    priority
                    sizes='20vw'
                    className='aspect-square object-cover rounded-t-xl'
                    onLoad={() => <ProductSkeleton />}
                    onClick={handleClick}
                />
                {hovered && (
                    <div className='absolute w-full px-6 bottom-5'>
                        <div className='flex gap-x-6 justify-center text-gray-600'>
                            <IconButton
                                onClick={onPreview}
                                className='!bg-white shadow-md p-2 hover:scale-110 transition'
                            >
                                <Expand size={20} />
                            </IconButton>
                        </div>
                    </div>
                )}
            </div>
            <div className='py-3 px-5 max-w-[280px]'>
                <h3 className='text-sm font-bold line-clamp-1'>{item?.name}</h3>
                <div className='flex items-center justify-between text-base'>
                    {salePercentage && (
                        <span>{formatMoney(handleSalePrice(item?.price))}</span>
                    )}
                    <span
                        className={cn(
                            salePercentage && 'line-through text-gray-500',
                        )}
                    >
                        {formatMoney(item?.price)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
