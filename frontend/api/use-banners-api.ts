import axios from 'axios';
import { BannerType } from '@/types';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/banners`;

export const useBannersApi = () => {
    const getBanners = async () => {
        const response = await axios.get(baseUrl);

        return response.data as BannerType[];
    };

    const getBannerById = async (bannerId: string) => {
        const response = await axios.get(`${baseUrl}/${bannerId}`);

        return response.data as BannerType;
    };

    return {
        getBanners,
        getBannerById,
    };
};
