'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryType } from '@/types';

const Categories = ({ categories }: { categories: CategoryType[] }) => {
    return (
        <>
            {categories?.map((item) => (
                <div key={item.id}>
                    <Link
                        href={`/categories/${item.id}`}
                        className='p-2 hover:text-slate-700'
                    >
                        {item.name}
                    </Link>
                </div>
            ))}
        </>
    );
};

export default Categories;
