'use client';
import NextImage from 'next/image';
import { Tab } from '@headlessui/react';
import { Image } from '@/types';
import { cn } from '@/lib/utils';

interface GalleryProps {
    images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
    return (
        <Tab.Group
            as='div'
            className='flex flex-row-reverse gap-x-5 flex-1 w-full h-full xl:max-w-[500px] xl:max-h-[660px]'
        >
            <div className='mx-auto mt-2 hidden max-w-2xl sm:block lg:max-w-none'>
                {/* list */}
                <Tab.List className='flex flex-col gap-y-5'>
                    {images.map((image) => (
                        <Tab
                            key={image.id}
                            className='relative flex flex-col aspect-square flex-cols h-[50px] cursor-pointer items-center justify-center rounded-md bg-white'
                        >
                            {({ selected }) => (
                                <div className=''>
                                    <span className='absolute h-full w-full inset-0 overflow-hidden rounded-md'>
                                        <NextImage
                                            fill
                                            src={image.url}
                                            alt=''
                                            priority
                                            sizes='30vw'
                                            className='object-cover object-center'
                                        />
                                    </span>
                                    <span
                                        className={cn(
                                            'absolute inset-0 rounded-md ring-2 ring-offset-2',
                                            selected
                                                ? 'ring-black'
                                                : 'ring-transparent',
                                        )}
                                    />
                                </div>
                            )}
                        </Tab>
                    ))}
                </Tab.List>
            </div>
            {/* large */}
            <Tab.Panels className='w-full'>
                {images.map((image) => (
                    <Tab.Panel key={image.id}>
                        <div className='relative h-[450px] md:h-[550px] w-full sm:rounded-lg overflow-hidden'>
                            <NextImage
                                fill
                                src={image.url}
                                alt='Image'
                                className='object-cover object-center'
                            />
                        </div>
                    </Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    );
};

export default Gallery;
