'use client';

import CatBanner from '@/components/cat-banner';
import Heading from '@/components/heading';
import ProductList from '@/components/products/product-list';
import Slider from '@/components/slider';
import { useQuery } from '@tanstack/react-query';
import ProductListSkeleton from '@/components/skeleton/product-list-skeleton';
import Image from 'next/image';
import { useProductsApi } from '@/api/use-products-api';

export default function HomePage() {
    const { getProducts } = useProductsApi();

    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });

    const featuredProducts = products?.filter((p) => p.isFeatured === true);

    if (!products || !featuredProducts) return null;

    const sliceNewProducts = products?.slice(0, 8);

    return (
        <div className='mb-[100px]'>
            <div className='relative'>
                <Image
                    src='/banner.png'
                    alt='banner'
                    width={1920}
                    height={797}
                    priority
                />
            </div>
            <div className='max-w-[1440px] mx-auto lg:px-5'>
                <div className='w-full'>
                    {!products ? (
                        <>
                            <ProductListSkeleton />
                            <ProductListSkeleton />
                        </>
                    ) : (
                        <>
                            <ProductList
                                title='Sản phẩm mới'
                                items={sliceNewProducts}
                            />
                            <div className='hidden md:block'>
                                <Heading title='Sản phẩm nổi bật' />
                                <Slider products={featuredProducts} />
                            </div>
                        </>
                    )}
                </div>
                <div className='w-full mt-20'>
                    <CatBanner />
                </div>
            </div>
        </div>
    );
}
