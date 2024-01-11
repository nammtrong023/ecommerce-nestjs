import axios from 'axios';
import { SizeType } from '@/types';
import { useQueries } from '@tanstack/react-query';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sizes`;

export const useSizesApi = () => {
    const data = useQueries({
        queries: [
            {
                queryKey: ['get-sizes'],
                queryFn: async () => {
                    const response = await axios.get(baseUrl);

                    return response.data as SizeType[];
                },
            },
        ],
    });

    const getSizeId = async (sizeId: string) => {
        const response = await axios.get(`${baseUrl}/${sizeId}`);

        return response.data as SizeType;
    };

    const allSizes = data[0].data;

    return {
        allSizes,
        getSizeId,
    };
};
