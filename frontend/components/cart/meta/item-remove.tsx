import { useCartStore } from '@/store/cart-store';
import { ProductInCart } from '@/types';
import { X } from 'lucide-react';

const ItemRemove = ({ item }: { item: ProductInCart }) => {
    const { removeFromCart } = useCartStore();

    return (
        <span className='cursor-pointer w-6 h-6 rounded-full relative left-2 flex items-center justify-center hover:bg-gray-200'>
            <X
                className='w-5 h-5 text-text3 hover:text-error'
                onClick={() => removeFromCart(item.id)}
            />
        </span>
    );
};

export default ItemRemove;
