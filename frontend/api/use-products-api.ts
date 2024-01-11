import axios from 'axios';
import { ProductType } from '@/types';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/products`;

export const useProductsApi = () => {
    const getProducts = async () => {
        const response = await axios.get(baseUrl);

        return response.data.data as ProductType[];
    };

    const searchProducts = async (name: string | null) => {
        const response = await axios.get(`${baseUrl}?search=${name}`);

        return response.data.data as ProductType[];
    };

    const getAllProductsAndFilter = async (url: string) => {
        const response = await axios.get(url);

        return response.data.data as ProductType[];
    };

    const getProductsByCat = async (url: string) => {
        const response = await axios.get(url);

        return response.data as ProductType[];
    };

    const getProductById = async (productId: string) => {
        const response = await axios.get(`${baseUrl}/${productId}`);

        return response.data as ProductType;
    };

    const getNewProducts = async () => {
        const response = await axios.get(`${baseUrl}/new-products`);

        return response.data as ProductType[];
    };

    return {
        getProducts,
        getNewProducts,
        searchProducts,
        getAllProductsAndFilter,
        getProductsByCat,
        getProductById,
    };
};
