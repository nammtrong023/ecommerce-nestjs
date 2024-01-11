import Image from 'next/image';
import React from 'react';

const Empty = ({ type = 'cart' }: { type?: 'cart' | 'order' }) => {
    const src = type === 'cart' ? '/empty.png' : '/empty-order.png';

    return (
        <div className='relative flex items-center justify-center'>
            <Image
                src={src}
                alt=''
                className='object-cover'
                width={500}
                height={500}
            />
        </div>
    );
};

export default Empty;
