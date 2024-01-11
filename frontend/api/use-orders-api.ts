import { OrderType } from '@/types';
import useAxiosPrivate from '@/hook/use-axios-private';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/orders`;

export const useOrdersApi = () => {
    const axiosPrivate = useAxiosPrivate();

    const getOrdersByUserId = async () => {
        const response = await axiosPrivate.get(`${baseUrl}/get-by-user-id`);

        return response.data as OrderType[];
    };

    const createOrder = async (data: any) => {
        await axiosPrivate.post(baseUrl, data);
    };

    return {
        getOrdersByUserId,
        createOrder,
    };
};
