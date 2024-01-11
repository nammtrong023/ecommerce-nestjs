'use client';
import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';
import { CategoryType, ColorType, SizeType } from '@/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterProps {
    data?: (ColorType | CategoryType)[];
    name: string;
    sizes?: SizeType[];
    valueKey: string;
}

const Filter: React.FC<FilterProps> = ({ data, name, sizes, valueKey }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: number) => {
        const parseId = id.toString();
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id,
        };

        if (current[valueKey] === parseId) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl(
            {
                url: window.location.href,
                query,
            },
            { skipNull: true },
        );

        router.push(url);
    };

    return (
        <div className='mb-8'>
            <h3 className='text-lg font-semibold'>{name}</h3>
            <hr className='my-4' />
            <div className='flex flex-wrap gap-2'>
                {sizes &&
                    sizes.map((size) => (
                        <div key={size.id} className='flex items-center'>
                            <Button
                                className={cn(
                                    'rounded-md text-sm p-2 border text-gray-800 border-gray-300',
                                    selectedValue == size.id.toString()
                                        ? 'bg-black text-white hover:bg-opacity-90'
                                        : 'bg-white hover:text-[#95a5a6] hover:bg-white',
                                )}
                                onClick={() => onClick(size.id)}
                            >
                                {size.value}
                            </Button>
                        </div>
                    ))}
                {data &&
                    data.map((filter) => (
                        <div key={filter.id} className='flex items-center'>
                            <Button
                                className={cn(
                                    'rounded-md text-sm p-2 border text-gray-800 border-gray-300',
                                    selectedValue == filter.id.toString()
                                        ? 'bg-black text-white hover:bg-opacity-90'
                                        : 'bg-white hover:text-[#95a5a6] hover:bg-white',
                                )}
                                onClick={() => onClick(filter.id)}
                            >
                                {filter.name}
                            </Button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Filter;
