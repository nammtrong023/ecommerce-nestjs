import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { UserType } from '@/types';
import { useAuth } from '@/providers/auth-provider';

const ProfileAction = ({ user }: { user: UserType }) => {
    const { logout } = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='line-clamp-1 hover:text-blue-300 md:inline-block hidden text-sm'>
                {user.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href={`/profiles/${user.id}`}>
                        <span>Cá nhân</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className='cursor-pointer'>
                    <span>Đăng xuất</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileAction;
