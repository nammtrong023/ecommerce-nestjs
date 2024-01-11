import React from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useCartStore } from '@/store/cart-store';
import { ProductInCart } from '@/types';
import { useModalStore } from '@/store/modal-store';

const ItemQuaniquantity = ({
    item,
    index,
}: {
    item: ProductInCart;
    index: number;
}) => {
    const { setIsOpenSelect } = useModalStore();
    const { changeQuantityValue } = useCartStore();

    const quantitys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [quantity, setQuaniquantity] = React.useState<string[]>([]);

    const handleChange = (event: any, index: number, id: string) => {
        const newSelectedValues = [...quantity];
        newSelectedValues[index] = event.target.value;

        setQuaniquantity(newSelectedValues);
        changeQuantityValue(id, parseInt(newSelectedValues[index]));
    };

    return (
        <div>
            <FormControl sx={{ minWidth: 70 }} size='small'>
                <Select
                    inputProps={{ 'aria-label': 'Without label' }}
                    value={item.quantity}
                    onChange={(event) => handleChange(event, index, item.id)}
                    onOpen={() => setIsOpenSelect(true)}
                    onClose={() => setIsOpenSelect(false)}
                >
                    {quantitys.map((quantity) => (
                        <MenuItem
                            key={quantity}
                            className='cursor-pointer options'
                            sx={{ py: 0 }}
                            value={quantity.toString()}
                        >
                            {quantity}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default ItemQuaniquantity;
