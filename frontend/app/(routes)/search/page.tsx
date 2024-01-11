'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import SearchItems from './search-items';
import { useProductsApi } from '@/api/use-products-api';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchPage = () => {
    const queryClient = useQueryClient();

    const { searchProducts } = useProductsApi();
    const [isMounted, setIsMounted] = useState(false);

    const searchParams = useSearchParams();
    const query = searchParams ? searchParams.get('q') : null;

    const { data, refetch, isRefetching } = useQuery({
        queryKey: ['search-products'],
        queryFn: () => searchProducts(query),
    });

    useEffect(() => {
        refetch();
        setIsMounted(true);
        queryClient.invalidateQueries({ queryKey: ['search-products'] });
    }, [query, queryClient, refetch]);

    if (!data || !isMounted) return null;

    return (
        <SearchItems products={data} query={query} isLoading={isRefetching} />
    );
};

export default SearchPage;
