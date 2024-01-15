import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

const SortPrice = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleSortPrice = (type: 'asc' | 'desc') => {
        const parsedSearchParams = qs.parse(searchParams.toString());
        const query = { ...parsedSearchParams };

        if (type === 'asc' || type === 'desc') {
            query.sort = type;
        } else {
            delete query.sort;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href.split('?')[0],
                query,
            },
            { skipNull: true },
        );

        router.push(url);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                <span className='border rounded-lg p-3 focus-visible:ring-0 focus-visible:ring-offset-0'>
                    Sắp xếp
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    onClick={() => handleSortPrice('asc')}
                    className='focus-visible:ring-offset-0 focus-visible:ring-0 cursor-pointer flex flex-col items-center justify-center gap-y-2 rounded-lg'
                >
                    <span className='text-base py-1'>Giá tăng dần</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleSortPrice('desc')}
                    className='focus-visible:ring-offset-0 focus-visible:ring-0 cursor-pointer flex flex-col items-center justify-center gap-y-2 rounded-lg'
                >
                    <span className='text-base py-1'>Giá giảm dần</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortPrice;
