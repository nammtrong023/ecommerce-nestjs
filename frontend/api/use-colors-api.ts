import axios from 'axios';
import { ColorType } from '@/types';
import { useQueries } from '@tanstack/react-query';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/colors`;

export const useColorsApi = () => {
    const data = useQueries({
        queries: [
            {
                queryKey: ['get-colors'],
                queryFn: async () => {
                    const response = await axios.get(baseUrl);

                    return response.data as ColorType[];
                },
            },
        ],
    });

    const getColorId = async (colorId: string) => {
        const response = await axios.get(`${baseUrl}/${colorId}`);

        return response.data as ColorType;
    };

    const allColors = data[0].data;

    return {
        allColors,
        getColorId,
    };
};
