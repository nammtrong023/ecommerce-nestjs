import Link from 'next/link';
import { ProductInCart } from '@/types';
import Image from 'next/image';

const ItemImages = ({
    item,
    sizeImg,
}: {
    item: ProductInCart;
    sizeImg?: string;
}) => {
    const { images, name } = item;

    return (
        <Link href={`/products/${item.productId}`}>
            <div
                className={`relative ${
                    sizeImg
                        ? 'w-[90px] min-h-[110px]'
                        : 'w-[120px] min-h-[140px]'
                }`}
            >
                <Image
                    src={images?.[0].url || '/transparent'}
                    alt={name || ''}
                    sizes='30vw'
                    className='absolute object-cover'
                    fill
                    priority
                />
            </div>
        </Link>
    );
};

export default ItemImages;
