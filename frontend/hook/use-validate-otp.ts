import { useAuth } from '@/providers/auth-provider';
import { useModalStore } from '@/store/modal-store';
import { TokenType } from '@/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;

type dataType = {
    otp: string;
    email: string;
};

const useValidateOtp = () => {
    const { onClose } = useModalStore();
    const router = useRouter();
    const { emailSignUp, authToken, setEmailSignUp, handleCookies } = useAuth();

    const [otp, setOtp] = useState('');
    const [isTimeout, setIsTimeout] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const { data, mutate, status } = useMutation({
        mutationFn: async (data: dataType) => {
            const response = await axios.post(`${baseUrl}/verify-otp`, data);
            return response.data as TokenType;
        },
        onSuccess: (data) => {
            onClose();
            handleCookies(data);
        },
        onError: (error) => {
            toast.error('Mã xác thực không khớp');
        },
    });

    const handleSubmit = () => {
        mutate({ email: emailSignUp, otp });
    };

    useEffect(() => {
        if (status === 'success' && data) {
            handleCookies(data);
            setEmailSignUp('');
        }
    }, [
        data,
        router,
        status,
        authToken?.accessToken,
        handleCookies,
        setEmailSignUp,
    ]);

    useEffect(() => {
        let otpTimeout: NodeJS.Timeout;

        if (isTimeout) {
            otpTimeout = setTimeout(() => {
                setRemainingTime((prevTime) =>
                    prevTime > 0 ? prevTime - 1 : 0,
                );
            }, 1000);
        }

        if (remainingTime === 0) {
            setIsTimeout(false);
        }

        return () => clearTimeout(otpTimeout);
    }, [isTimeout, remainingTime]);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleResend = async () => {
        setIsTimeout(true);
        setRemainingTime(120);

        try {
            await axios.post(`${baseUrl}/resend-otp`, { email: emailSignUp });
        } catch (error) {
            console.log(error);
        }
    };

    return {
        isTimeout,
        remainingTime,
        otp,
        setRemainingTime,
        handleResend,
        formatTime,
        handleSubmit,
        setIsTimeout,
        setOtp,
    };
};

export default useValidateOtp;
