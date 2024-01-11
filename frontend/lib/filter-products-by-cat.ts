'use client';

import { useProductsApi } from '@/api/use-products-api';
import { useQuery } from '@tanstack/react-query';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/products/filter-products-by-cat`;

interface Query {
    categoryId: string;
    colorId?: string;
    sizeId?: string;
    price?: number;
    sort: 'asc' | 'desc';
}

const useFilterProductsByCat = (query: Query) => {
    const { getProductsByCat } = useProductsApi();

    const url = qs.stringifyUrl({
        url: `${URL}/${query.categoryId}`,
        query: {
            colorId: query.colorId,
            sizeId: query.sizeId,
            price: query.price,
            sort: query.sort,
        },
    });

    const {
        data: products,
        isFetching,
        refetch,
    } = useQuery({
        initialData: [],
        queryKey: ['products-by-category'],
        queryFn: () => getProductsByCat(url),
    });

    return { products, isFetching, refetch };
};

export default useFilterProductsByCat;
