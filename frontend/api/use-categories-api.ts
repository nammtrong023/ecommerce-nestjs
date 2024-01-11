import axios from 'axios';
import { CategoryType } from '@/types';
import { useQueries } from '@tanstack/react-query';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/categories`;

export const useCategoriesApi = () => {
    const data = useQueries({
        queries: [
            {
                queryKey: ['get-categories'],
                queryFn: async () => {
                    const response = await axios.get(baseUrl);

                    return response.data as CategoryType[];
                },
            },
        ],
    });

    const getCategoryById = async (categoryId: string) => {
        const response = await axios.get(`${baseUrl}/${categoryId}`);

        return response.data as CategoryType;
    };

    const allCats = data[0].data;

    return {
        allCats,
        getCategoryById,
    };
};
