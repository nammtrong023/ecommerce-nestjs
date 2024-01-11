'use client';

import { cn, formatMoney } from '@/lib/utils';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ShoppingCart } from 'lucide-react';
import Gallery from '../ui/gallery';
import { SelectedValue, useCartStore } from '@/store/cart-store';
import { ProductType } from '@/types';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const ProductDetails = ({ item }: { item: ProductType }) => {
    const colorValues = item.colors.map((entry) => entry.color.value);
    const sizeValues = item?.sizes.map((entry) => entry.size.value);

    const [selectedOption, setSelectedOption] = useState<SelectedValue>({
        size: null,
        color: null,
    });

    const { addCartItem, setSelectedValue } = useCartStore();

    const handleChooseOption = (type: 'size' | 'color', value: string) => {
        setSelectedOption((prevSelected) => ({
            ...prevSelected,
            [type]: prevSelected[type] === value ? null : value,
        }));

        setSelectedValue({
            size:
                type === 'size'
                    ? selectedOption.size === value
                        ? null
                        : value
                    : selectedOption.size,
            color:
                type === 'color'
                    ? selectedOption.color === value
                        ? null
                        : value
                    : selectedOption.color,
        });
    };

    const handleAddCart = (
        item: ProductType,
        productId: string,
        id: string,
    ) => {
        if (selectedOption.size === null || selectedOption.color === null) {
            return toast.error('Vui lòng chọn phân loại hàng');
        }

        addCartItem(item, productId, id);
        toast.success('Thêm vào giỏ hàng thành công');
    };

    return (
        <>
            <div className='px-5 py-5'>
                <div className='flex flex-col gap-y-10 md:flex-row gap-x-10 justify-between'>
                    <Gallery images={item?.images} />
                    <div className='flex-1 flex flex-col xl:max-w-[450px] max-w-[400px] gap-y-4'>
                        <div className='text-text2 flex flex-col gap-y-3 font-medium text-2xl'>
                            <h3 className='capitalize'>{item?.name}</h3>
                            <span className='bg-slate-200 block p-5 bg-opacity-30'>
                                {formatMoney(item?.price)}
                            </span>
                        </div>
                        <p className='px-5'>{item?.desc}</p>
                        <div className={`flex flex-col gap-y-4 py-3 px-5`}>
                            <div className='flex flex-col gap-y-4'>
                                <div className='flex flex-col gap-y-3'>
                                    <h3 className='text-text2 font-medium text-lg'>
                                        Kích thước:
                                    </h3>
                                    <div className='flex items-center select-none gap-x-3'>
                                        {sizeValues?.map((item, index) => (
                                            <div
                                                key={index}
                                                className={cn(
                                                    'bg-white cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg border',
                                                    selectedOption.size === item
                                                        ? 'border-blue-300'
                                                        : 'border-strock',
                                                )}
                                                onClick={() =>
                                                    handleChooseOption(
                                                        'size',
                                                        item,
                                                    )
                                                }
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className='mb-3 text-text2 font-medium text-lg'>
                                        Màu sắc:
                                    </h3>
                                    <div className='flex items-center gap-x-2'>
                                        {colorValues?.map((item) => (
                                            <div
                                                key={item}
                                                className={cn(
                                                    'rounded-full border cursor-pointer w-fit p-[3px]',
                                                    selectedOption.color ===
                                                        item
                                                        ? 'border-blue-300'
                                                        : 'border-strock',
                                                )}
                                                onClick={() =>
                                                    handleChooseOption(
                                                        'color',
                                                        item,
                                                    )
                                                }
                                            >
                                                <div
                                                    className='w-5 h-5 rounded-full'
                                                    style={{
                                                        backgroundColor: item,
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            type='button'
                            className='max-w-[90%] mx-auto inline-flex items-center mt-10 gap-x-3 min-h-[50px]'
                            onClick={() =>
                                handleAddCart(item, item.id, uuidv4())
                            }
                        >
                            <ShoppingCart size={22} />
                            <p>Thêm Vào Giỏ Hàng</p>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
