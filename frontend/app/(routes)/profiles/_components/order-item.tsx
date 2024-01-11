import { OrderDetailType } from '@/types';
import React from 'react';
import Image from 'next/image';
import { formatMoney } from '@/lib/utils';
import { format } from 'date-fns';

interface OrderItemProps {
    address: string;
    phone: string;
    date: Date;
    total: number;
    orderItem: OrderDetailType[];
}

const OrderItem = ({
    orderItem,
    address,
    date,
    total,
    phone,
}: OrderItemProps) => {
    const dateFormated = format(new Date(date), 'dd/MM/yyyy');

    return (
        <div className='h-full w-full'>
            <div className='flex flex-col text-sm space-y-1'>
                <div>
                    <strong>Điện thoại:</strong> {phone}
                </div>
                <div>
                    <strong>Ngày mua: </strong>
                    {dateFormated}
                </div>
                <div className='line-clamp-1 w-full'>
                    <strong>Địa chỉ:</strong> {address}
                </div>
                <div>
                    <strong>Tổng tiền: </strong>
                    {formatMoney(total)}
                </div>
            </div>
            {orderItem?.map((item) => (
                <div key={item.id} className='flex py-6 border-b w-full'>
                    <div className='flex gap-x-6 w-full items-center'>
                        <div className='relative min-w-[100px] w-28 h-[168px] my-auto'>
                            <Image
                                src={
                                    item?.product.images[0]?.url ||
                                    '/transparent.png'
                                }
                                alt={item.product.name}
                                fill
                                priority
                            />
                        </div>

                        <div className='flex flex-col gap-y-4 w-[450px]'>
                            <div className='flex items-center gap-x-3 md:justify-between w-full sm:w-[430px]'>
                                <h3 className='text-sm text-text2 font-semibold line-clamp-2'>
                                    {item.product.name}
                                </h3>
                            </div>

                            <div className='flex flex-col gap-y-1 lg:gap-y-3 justify-between'>
                                <div className='flex lg:flex-row gap-y-1 flex-col gap-x-12 xl:gap-x-20'>
                                    <DetailItemsWrapper text='Kích thước'>
                                        <strong className='w-6 lg:text-center lg:ml-auto'>
                                            {item.size}
                                        </strong>
                                    </DetailItemsWrapper>
                                    <DetailItemsWrapper text='Số lượng'>
                                        {item.quantity}
                                    </DetailItemsWrapper>
                                </div>
                                <div className='flex lg:flex-row gap-y-1 flex-col gap-x-12 xl:gap-x-20'>
                                    <DetailItemsWrapper text='Màu'>
                                        <div
                                            className='w-6 h-6 rounded-md border cursor-pointer lg:ml-auto'
                                            style={{
                                                backgroundColor: `${item.color}`,
                                            }}
                                        />
                                    </DetailItemsWrapper>

                                    <DetailItemsWrapper text='Tổng tiền'>
                                        {formatMoney(item.product.price)}
                                    </DetailItemsWrapper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

function DetailItemsWrapper({
    children,
    text,
}: {
    children: React.ReactNode;
    text: string;
}) {
    return (
        <span className='text-sm flex items-center gap-x-3 md:gap-x-10 min-w-[163px]'>
            <p className='min-w-[80px]'>{text}:</p>
            {children}
        </span>
    );
}

export default OrderItem;
