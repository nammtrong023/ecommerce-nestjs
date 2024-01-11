import qs from 'query-string';
import * as React from 'react';
import Slider from '@mui/material/Slider';
import { useRouter, useSearchParams } from 'next/navigation';

function PriceSlider() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [price, setPrice] = React.useState<number | number[]>(100);

    const handleSliderChange = (event: Event, newPrice: number | number[]) => {
        setPrice(newPrice);
    };

    const handleSliderChangeCommitted = (
        event: any,
        newPrice: number | number[],
    ) => {
        const parsedSearchParams = qs.parse(searchParams.toString());
        const query = { ...parsedSearchParams };

        if (newPrice !== 0) {
            query.price = newPrice.toString();
        } else {
            delete query.price;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href.split('?')[0],
                query,
            },
            { skipNull: true },
        );

        router.push(url);
    };

    return (
        <>
            <h3 className='text-lg font-semibold'>Giá</h3>
            <hr className='my-4' />
            <Slider
                value={price}
                onChange={handleSliderChange}
                valueLabelDisplay='auto'
                onChangeCommitted={handleSliderChangeCommitted}
                valueLabelFormat={(value) =>
                    `${value.toLocaleString('en-US').replace(/,/g, '.')}đ`
                }
                aria-labelledby='range-slider'
                min={100000}
                max={1000000}
            />
        </>
    );
}

export default PriceSlider;
