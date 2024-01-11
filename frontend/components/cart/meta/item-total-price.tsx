import { formatMoney } from '@/lib/utils';
import { ProductInCart } from '@/types';

const ItemTotalPrice = ({ item }: { item: ProductInCart }) => {
    const { price, quantity } = item;
    const formattedMoney = formatMoney(Math.floor(Number(price) * quantity));

    return <span className='lg:ml-auto'>{quantity && formattedMoney}</span>;
};

export default ItemTotalPrice;
