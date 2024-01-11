import { useAuth } from '@/providers/auth-provider';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;

export const useSignInOauth = () => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);

    const { handleCookies } = useAuth();
    const searchParam = useSearchParams();

    const signInWithOauth = async () => {
        try {
            const response = await axios.post(`${baseUrl}/oauth`);

            if (response.data) {
                router.push(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCallback = useCallback(
        async (code: string) => {
            try {
                const { data } = await axios.get(
                    `${baseUrl}/oauth/callback?code=${code}`,
                );

                handleCookies(data);
            } catch (error) {
                console.log(error);
                setisLoading(false);
            } finally {
                router.refresh();
                router.push('/');
            }
        },
        [handleCookies, router, setisLoading],
    );

    useEffect(() => {
        const code = searchParam.get('code');

        if (code) {
            setisLoading(true);
            handleCallback(code);
        }
    }, [handleCallback, searchParam, setisLoading]);

    return { isLoading, setisLoading, signInWithOauth };
};
