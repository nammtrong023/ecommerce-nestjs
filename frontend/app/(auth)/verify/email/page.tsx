'use client';

import axios from 'axios';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AtSignIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/providers/auth-provider';
import { redirect } from 'next/navigation';

const formSchema = z.object({
    email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
});

type VerifyEmailForm = z.infer<typeof formSchema>;

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email`;

const VerifyEmailPage = () => {
    const { currentUser } = useAuth();

    const form = useForm<VerifyEmailForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    const { mutate, isSuccess, isPending } = useMutation({
        mutationKey: ['verify-email'],
        mutationFn: async (value: VerifyEmailForm) => {
            await axios.post(baseUrl, value);
        },
        onError: (error) => {
            console.log(error);
            toast.error('Không tìm thấy email của bạn');
        },
    });

    const { email } = form.getValues();

    useEffect(() => {}, [email]);

    const onSubmit = (value: VerifyEmailForm) => {
        mutate(value);
    };

    if (currentUser) {
        return redirect('/');
    }

    return (
        <>
            {!isSuccess && (
                <div className='flex flex-col items-center justify-center gap-y-[10px]'>
                    <h1 className='font-bold text-lg lg:text-3xl'>
                        Quên mật khẩu
                    </h1>
                    <p className='font-medium text-sm lg:text-base text-center'>
                        Đặt lại mật khẩu qua email
                    </p>
                </div>
            )}
            <div className='bg-white relative dark:bg-[#212833] rounded-[20px] p-10 w-full flex flex-col gap-y-5'>
                {isSuccess ? (
                    <div className='flex flex-col items-center justify-center gap-y-[10px]'>
                        <h1 className='font-bold text-lg lg:text-3xl'>
                            Vui lòng kiểm tra email
                        </h1>
                        <p className='font-medium text-sm lg:text-base text-center'>
                            Một email đặt lại mật khẩu đã được gửi về:{' '}
                            <span className='text-blueFF'>{email}</span>
                        </p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form
                            method='post'
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='w-full relative'>
                                        <AtSignIcon className='w-4 h-4 absolute left-5 top-[11px] lg:top-[19px] font-bold' />
                                        <Input
                                            className='h-10 lg:h-[52px] rounded-md lg:rounded-[10px] pl-11 !m-0 text-sm bg-transparent dark:bg-dark2'
                                            placeholder='Email của bạn'
                                            disabled={isPending}
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type='submit'
                                disabled={isPending}
                                className='w-full h-10 lg:h-[52px] rounded-md lg:rounded-[10px] mt-[30px] text-sm md:text-base'
                            >
                                Gửi
                            </Button>
                        </form>
                    </Form>
                )}
            </div>
        </>
    );
};

export default VerifyEmailPage;
