import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <Link href='/' className='flex md:gap-x-1 items-center'>
            <div className='relative md:w-12 md:h-12 w-8 h-8'>
                <Image src='/logo.png' alt='Growth' sizes='10vw' fill />
            </div>
            <h2 className='text-lg md:text-2xl font-semibold'>Growth</h2>
        </Link>
    );
};

export default Logo;
