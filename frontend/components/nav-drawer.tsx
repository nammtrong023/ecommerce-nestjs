import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronRight, Menu } from 'lucide-react';
import Logo from './logo';
import { CategoryType } from '@/types';
import Image from 'next/image';
import { DropdownMenuSeparator } from './ui/dropdown-menu';
import Link from 'next/link';

export function NavSheet({ categories }: { categories: CategoryType[] }) {
    return (
        <Sheet>
            <SheetTrigger asChild className='inline-block md:hidden'>
                <Button variant='ghost'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side='left'>
                <div className='w-full max-w-sm p-3 space-y-5'>
                    <SheetHeader>
                        <Logo />
                        <DropdownMenuSeparator />
                    </SheetHeader>
                    <div className='space-y-8'>
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.id}`}
                                className='flex items-center gap-x-5 hover:bg-slate-100/70 p-2 rounded-lg'
                            >
                                <div className='w-14 h-14 rounded-full relative flex-shrink-0'>
                                    <Image
                                        src={category.image}
                                        alt=''
                                        fill
                                        className='object-cover rounded-full'
                                    />
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <div className='text-base'>
                                        {category.name}
                                    </div>
                                    <ChevronRight />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
