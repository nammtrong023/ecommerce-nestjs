'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return <main className={cn(!isHome && 'mt-[84px] mb-10')}>{children}</main>;
};

export default Container;
