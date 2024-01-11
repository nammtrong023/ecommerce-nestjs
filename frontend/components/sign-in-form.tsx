'use client';

import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const signinSchema = z.object({
    email: z.string().email('Vui lòng nhập email hợp lệ'),
    password: z.string().min(5, 'Vui lòng nhập email hợp lệ'),
});

export type SignInFormValues = z.infer<typeof signinSchema>;

import React, { useEffect } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import useAuthApi from '@/api/use-auth-api';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useModalStore } from '@/store/modal-store';
import { useAuth } from '@/providers/auth-provider';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const SignInForm = () => {
    const { login } = useAuthApi();
    const { onClose } = useModalStore();
    const { handleCookies } = useAuth();

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(signinSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: SignInFormValues) => login(data),
        onSuccess: (data) => {
            handleCookies(data);
            toast.success('Đăng nhập thành công');
            onClose();
        },
        onError: (error) => {
            toast.error('Mật khẩu hoặc email không chính xác');
        },
    });

    const onSubmit = (data: SignInFormValues) => {
        mutate(data);
    };

    return (
        <>
            <Form {...form}>
                <form
                    className='grid gap-4 py-4 w-full'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem className='grid grid-cols-4 items-center gap-4 w-full'>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        id='email'
                                        placeholder='Email của bạn'
                                        className='col-span-3'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem className='grid grid-cols-4 items-center gap-x-4'>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input
                                        id='password'
                                        placeholder='Mật khẩu của bạn'
                                        type='password'
                                        className='col-span-3'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className='w-full'>
                        <Link
                            href='/verify/email'
                            className='w-full inline-block text-right p-0 m-0 text-sm mb-2 hover:underline text-blue-400'
                            onClick={onClose}
                        >
                            Quên mật khẩu
                        </Link>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isPending}
                        >
                            {isPending && (
                                <Loader2 className='animate-spin mr-2' />
                            )}
                            Đăng nhập
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default SignInForm;
