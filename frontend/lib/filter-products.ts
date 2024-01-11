'use client';

import { useProductsApi } from '@/api/use-products-api';
import { useQuery } from '@tanstack/react-query';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/products/filter-products`;

interface Query {
    catId?: string;
    colorId?: string;
    sizeId?: string;
    price?: number;
    sort?: 'asc' | 'desc';
}

const useFilterProducts = (query: Query) => {
    const { getAllProductsAndFilter } = useProductsApi();

    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            sizeId: query.sizeId,
            catId: query.catId,
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
        queryKey: ['filter-products'],
        queryFn: () => getAllProductsAndFilter(url),
    });

    return { products, isFetching, refetch };
};

export default useFilterProducts;
