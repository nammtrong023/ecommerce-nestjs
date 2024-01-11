import { ProductType } from '@/types';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { cn } from '@/lib/utils';
import ProductCard from '../products/product-card';

const Pagination = ({
    products,
    className,
}: {
    products: ProductType[];
    className?: string;
}) => {
    const productsPerPage = 6;
    const [pageNumber, setPageNumber] = useState<number>(0);

    const pagesVisited = pageNumber * productsPerPage;
    const productsLength = products.length;

    const pageCount = Math.ceil(productsLength / productsPerPage);
    const displayItemsPerPage = products.slice(
        pagesVisited,
        pagesVisited + productsPerPage,
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pageNumber]);

    const handleChangePage = ({ selected }: { selected: number }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <div className={cn('grid lg:grid-cols-5', className)}>
                {displayItemsPerPage.map((product) => (
                    <ProductCard key={product.id} item={product} />
                ))}
            </div>
            {productsLength > 0 && (
                <div className='m-10'>
                    <ReactPaginate
                        previousLabel={<ChevronLeft />}
                        breakLabel='...'
                        nextLabel={<ChevronRight />}
                        pageCount={pageCount}
                        onPageChange={handleChangePage}
                        className='pagination'
                    />
                </div>
            )}
        </>
    );
};

export default Pagination;
