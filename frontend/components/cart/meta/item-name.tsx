import { ProductInCart } from '@/types';
import Link from 'next/link';

const ItemName = ({ item }: { item: ProductInCart }) => {
    return (
        <Link href={`/product/${item.productId}`}>
            <h3 className='text-sm hover:underline font-semibold max-w-[270px] line-clamp-2'>
                {item.name}
            </h3>
        </Link>
    );
};

export default ItemName;
