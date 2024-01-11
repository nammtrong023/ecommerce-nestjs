'use client';
import { cn } from '@/lib/utils';
import { useSearchStore } from '@/store/search-store';
import { useMediaQuery } from '@mui/material';
import { Search as SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, KeyboardEvent } from 'react';

const Search = ({ onClose }: { onClose?: () => void }) => {
    const router = useRouter();
    const isTablet = useMediaQuery('(min-width:768px)');
    const { query, setQuery } = useSearchStore();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;

        if (target.value === '') return;

        if (e.key === 'Enter') {
            onClose && onClose();
            router.push(`/search?q=${query}`);
        }
    };

    return (
        <div className='lg:w-[350px] h-[50px] relative border-b-2 w-full md:border-none'>
            <SearchIcon
                size={20}
                className='absolute left-1 top-1/2 -translate-y-1/2 inline-block md:hidden'
            />
            <input
                type='text'
                className={cn(
                    'w-full h-full outline-none rounded-lg px-9 py-4 bg-[#f1f2f6] shadow-none text-black',
                    !isTablet && 'bg-transparent bg-white shadow-none',
                )}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder='Tìm kiếm'
            />
            <SearchIcon
                size={20}
                className='absolute right-6 top-1/2 -translate-y-1/2 md:inline-block hidden'
            />
            <X
                size={20}
                onClick={onClose}
                className='absolute right-6 top-1/2 -translate-y-1/2 inline-block md:hidden'
            />
        </div>
    );
};

export default Search;
