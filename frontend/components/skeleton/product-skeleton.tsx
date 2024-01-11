import { Skeleton } from '@mui/material';
import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className='mx-auto'>
            <Skeleton
                animation='wave'
                variant='rounded'
                width={250}
                height={350}
            />
        </div>
    );
};

export default ProductSkeleton;
