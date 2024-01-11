'use client';

import useAuthApi from '@/api/use-auth-api';
import { useOrdersApi } from '@/api/use-orders-api';
import Container from '@/components/container';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/providers/auth-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';
import OrderItem from '../_components/order-item';
import Empty from '@/components/empty';

const formShema = z.object({
    name: z.string().min(3, 'Tối thiểu 3 ký tự'),
});

export type UpdateProfileFormType = z.infer<typeof formShema>;

const ProfileIdPage = () => {
    const router = useRouter();
    const { updateProfile } = useAuthApi();

    const { getOrdersByUserId } = useOrdersApi();
    const { currentUser, setCurrentUser, logout } = useAuth();

    const form = useForm<UpdateProfileFormType>({
        resolver: zodResolver(formShema),
        defaultValues: {
            name: currentUser && currentUser.name,
        },
    });

    const { data: orders } = useQuery({
        queryKey: ['orders'],
        queryFn: getOrdersByUserId,
    });

    const { mutate, data } = useMutation({
        mutationFn: (data: UpdateProfileFormType) =>
            updateProfile(currentUser?.id, data),
        onSuccess: () => {
            toast.success('Thành công');
        },
        onError: (error) => {
            toast.error('Thất bại');
        },
    });

    const onSubmit = (data: UpdateProfileFormType) => {
        mutate(data);
    };

    useEffect(() => {
        if (currentUser) form.setValue('name', currentUser.name);

        if (data) setCurrentUser(data);
    }, [currentUser, data, form, setCurrentUser]);

    if (!currentUser) return redirect('/');

    if (!orders) return null;

    return (
        <Container>
            <Tabs
                defaultValue='account'
                className='h-full mx-auto max-w-3xl space-y-5 mt-10'
            >
                <div className='flex mx-auto'>
                    <TabsList className='mx-auto'>
                        <TabsTrigger value='account'>Tài khoản</TabsTrigger>
                        <TabsTrigger value='orders'>Đơn hàng</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value='account'>
                    <div className='bg-[#fafbfc] rounded-lg h-full mx-auto p-10'>
                        <Heading title='Cá nhân' />
                        <Form {...form}>
                            <form
                                className='space-y-4'
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormField
                                    name='name'
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tên của bạn</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Tên của bạn'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='space-y-2'>
                                    <span>Email</span>
                                    <Input
                                        readOnly
                                        className='focus-visible:ring-0 focus-visible:ring-offset-0'
                                        defaultValue={currentUser?.email}
                                    />
                                </div>
                                <div className='flex items-end w-full'>
                                    <Button
                                        variant='outline'
                                        className='ml-auto min-w-[100px]'
                                    >
                                        Lưu
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div className='flex mt-5' onClick={logout}>
                        <Button variant='destructive' className='ml-auto'>
                            Đăng xuất
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value='orders'>
                    <div className='bg-[#fafbfc] rounded-lg h-full mx-auto p-2 md:p-10 space-y-5'>
                        <Heading title='Đơn hàng' />

                        {orders.length === 0 && (
                            <div className='w-full flex-col items-center justify-center'>
                                <p className='text-neutral-500 text-lg font-medium text-center'>
                                    Không có đơn hàng.
                                </p>
                                <Empty type='order' />
                            </div>
                        )}

                        {orders.length > 0 &&
                            orders?.map((item) => (
                                <div key={item.id}>
                                    <OrderItem
                                        address={item.address}
                                        phone={item.phone}
                                        date={item.createdAt}
                                        key={item.id}
                                        total={item.total}
                                        orderItem={item.orderItems}
                                    />
                                </div>
                            ))}
                    </div>
                </TabsContent>
            </Tabs>
        </Container>
    );
};

export default ProfileIdPage;
