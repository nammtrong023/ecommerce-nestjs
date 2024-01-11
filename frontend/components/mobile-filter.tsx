'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';

import Filter from './filter';
import { Button } from './ui/button';
import { CategoryType, ColorType, SizeType } from '@/types';
import PriceSlider from './price-slider';

interface MobileFiltersProps {
    sizes: SizeType[];
    colors: ColorType[];
    cats?: CategoryType[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
    sizes,
    colors,
    cats,
}) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <Button
                onClick={onOpen}
                variant='outline'
                className='flex items-center gap-x-2 lg:hidden'
            >
                Bộ lọc
                <Plus size={20} />
            </Button>

            <Dialog
                open={open}
                as='div'
                className='relative z-40 lg:hidden'
                onClose={onClose}
            >
                <div className='fixed inset-0 bg-black bg-opacity-25' />

                <div className='fixed inset-0 z-40 flex'>
                    <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl'>
                        <div className='ml-auto mr-2'>
                            <X onClick={() => onClose()} />
                        </div>
                        <div className='p-4'>
                            <Filter
                                valueKey='catId'
                                name='Danh mục'
                                data={cats}
                            />
                            <Filter
                                valueKey='sizeId'
                                name='Kích thước'
                                sizes={sizes}
                            />
                            <Filter
                                valueKey='colorId'
                                name='Màu sắc'
                                data={colors}
                            />
                            <PriceSlider />
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default MobileFilters;
