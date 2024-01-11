'use client';

import dayjs from 'dayjs';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useAuth } from '@/providers/auth-provider';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const useAxiosPrivate = () => {
    const { authToken, handleCookies } = useAuth();

    const axiosPrivate = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken?.accessToken}`,
        },
    });

    axiosPrivate.interceptors.request.use(async (req) => {
        const user: any =
            authToken?.accessToken && jwt.decode(authToken?.accessToken);

        const currentTime = dayjs();
        const expirationTime = dayjs.unix(user.exp);

        const timeUntilExpire = expirationTime.diff(currentTime, 'minutes');

        const isExpired = timeUntilExpire < 5;

        if (!isExpired) return req;

        const { data } = await axios.post(`${baseURL}/auth/refresh`, null, {
            headers: {
                Authorization: `Bearer ${authToken?.refreshToken}`,
            },
        });

        handleCookies(data);
        req.headers.Authorization = `Bearer ${data.accessToken}`;

        return req;
    });

    return axiosPrivate;
};

export default useAxiosPrivate;
