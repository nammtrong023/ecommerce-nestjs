import { useCartStore } from '@/store/cart-store';
import ItemImages from './meta/item-images';
import ItemName from './meta/item-name';
import ItemTotalPrice from './meta/item-total-price';

const MiniCartItem = () => {
    const { cart } = useCartStore();

    return (
        <>
            {cart.reverse().map((item) => {
                return (
                    <div key={item.id}>
                        <div className='w-full h-[1px] bg-text3' />
                        <div className='flex gap-x-10 pb-5 px-3'>
                            <ItemImages item={item} sizeImg='miniCart' />
                            <div className='flex gap-y-3 flex-1 justify-between'>
                                <div className='flex flex-col gap-y-3'>
                                    <ItemName item={item} />
                                    <ItemTotalPrice item={item} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            {cart.length > 0 && <div className='w-full h-1 bg-blue-400' />}
        </>
    );
};

export default MiniCartItem;
