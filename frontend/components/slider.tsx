'use client';

import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import { ProductType } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './products/product-card';

const classNameControlBtn =
    'flex items-center justify-center text-white bg-[#bdc3c7] hover:bg-[#95a5a6] rounded-full z-40 cursor-pointer w-6 h-6 top-1/2 -translate-y-1/2 select-none';

export default function Slider({ products }: { products: ProductType[] }) {
    return (
        <div className='scale-100 w-full h-full'>
            <Swiper
                slidesPerView={5}
                modules={[Pagination, Navigation]}
                speed={500}
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        pagination: true,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                        pagination: true,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                        pagination: true,
                    },
                }}
                className='mySwiper w-full h-fit relative flex mx-auto'
            >
                {products.map((item) => (
                    <SwiperSlide key={item.id} className='flex !mt-0 mx-auto'>
                        <div className='mx-auto flex items-center justify-center'>
                            <ProductCard item={item} />
                        </div>
                    </SwiperSlide>
                ))}

                <span className={`prev ${classNameControlBtn} absolute left-5`}>
                    <ChevronLeft size={20} />
                </span>
                <span
                    className={`next ${classNameControlBtn} fixed right-2 !overflow-visible`}
                >
                    <ChevronRight size={20} />
                </span>
            </Swiper>
        </div>
    );
}
