import Image from 'next/image';
import { Trash } from 'lucide-react';
import { ProductInCart } from '@/types';
import { useCartStore } from '@/store/cart-store';
import { IconButton } from '@mui/material';
import { formatMoney } from '@/lib/utils';
import ItemTotalPrice from '@/components/cart/meta/item-total-price';
import ItemAmount from '@/components/cart/meta/item-amount';

interface CartItemProps {
    item: ProductInCart;
    index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
    const { removeFromCart } = useCartStore();

    return (
        <div className='flex py-6 border-b w-full'>
            <div className='flex gap-x-6 w-full items-center'>
                <div className='relative min-w-[100px] w-28 h-[168px] my-auto'>
                    <Image
                        src={item?.images[0]?.url || '/transparent.png'}
                        alt={item.name}
                        fill
                        priority
                    />
                </div>

                <div className='flex flex-col gap-y-4 w-[450px]'>
                    <div className='flex items-center gap-x-3 md:justify-between w-full sm:w-[430px]'>
                        <h3 className='text-sm text-text2 font-semibold line-clamp-2'>
                            {item.name}
                        </h3>
                        <IconButton
                            onClick={() => removeFromCart(item.id)}
                            sx={{
                                ml: 'auto',
                            }}
                        >
                            <Trash size={17} className='text-red-300' />
                        </IconButton>
                    </div>

                    <div className='flex flex-col gap-y-1 lg:gap-y-3 justify-between'>
                        <div className='flex lg:flex-row gap-y-1 flex-col gap-x-12 xl:gap-x-20'>
                            <DetailItemsWrapper text='Kích thước'>
                                <strong className='w-6 lg:text-center lg:ml-auto'>
                                    {item.size}
                                </strong>
                            </DetailItemsWrapper>

                            <DetailItemsWrapper text='Đơn giá'>
                                <span className='lg:ml-auto'>
                                    {formatMoney(item.price)}
                                </span>
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
                                <ItemTotalPrice item={item} />
                            </DetailItemsWrapper>
                        </div>
                    </div>
                    <div className='flex items-center h-fit w-[200px]'>
                        <ItemAmount item={item} index={index} />
                    </div>
                </div>
            </div>
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

export default CartItem;
