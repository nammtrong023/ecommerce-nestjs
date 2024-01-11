'use client';

import { useProductsApi } from '@/api/use-products-api';
import ProductDetails from '@/components/products/product-details';
import ProductList from '@/components/products/product-list';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

interface ProductPropsPage {
    params: {
        productId: string;
    };
}

const ProductPage: FC<ProductPropsPage> = ({ params }) => {
    const productId = params.productId as string;
    const { getProductById, getProducts } = useProductsApi();

    const { data: allProducts } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    const { data } = useQuery({
        queryKey: ['productId', params.productId],
        queryFn: () => getProductById(params.productId),
    });

    if (!data || !allProducts) return null;

    const similarProducts = allProducts.filter(
        (product) => product.category.id === data.category.id,
    );

    const suggestProduct = similarProducts.filter((p) => p.id !== productId);

    return (
        <Container maxWidth='xl'>
            <ProductDetails item={data} />
            {suggestProduct.length > 0 && (
                <div className='mt-10'>
                    <ProductList
                        title='Có thể bạn cũng thích'
                        items={suggestProduct}
                    />
                </div>
            )}
        </Container>
    );
};

export default ProductPage;
