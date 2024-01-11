import { VerifyEmailForm } from '@/app/(auth)/password-recovery/page';
import { UpdateProfileFormType } from '@/app/(routes)/profiles/[profileId]/page';
import { SignInFormValues } from '@/components/sign-in-form';
import { SignupFormValues } from '@/components/sign-up-form';
import useAxiosPrivate from '@/hook/use-axios-private';
import { TokenType, UserType } from '@/types';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const useAuthApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const register = async (data: SignupFormValues) => {
        await axios.post(`${baseUrl}/auth/register`, data);
    };

    const login = async (data: SignInFormValues) => {
        const response = await axios.post(`${baseUrl}/auth/login`, data);

        return response.data as TokenType;
    };

    const resetPassword = async (value: VerifyEmailForm) => {
        const response = await axios.post(
            `${baseUrl}/auth/reset-password`,
            value,
        );
        return response.data as TokenType;
    };

    const updateProfile = async (
        id: string | undefined,
        data: UpdateProfileFormType,
    ) => {
        const response = await axiosPrivate.patch(
            `${baseUrl}/users/${id}`,
            data,
        );

        return response.data as UserType;
    };

    return { register, login, resetPassword, updateProfile };
};

export default useAuthApi;
