import { Skeleton } from './ui/skeleton';

export const PostCardSkeleton = () => {
    return (
        <div className='bg-white mt-10 p-[18px] pb-2 w-full rounded-xl dark:bg-dark1 max-w-[516px] mx-auto'>
            <div className='flex items-center justify-between mb-4 gap-x-3 w-full'>
                <Skeleton className='w-12 h-12 rounded-full flex-shrink-0' />
                <div className='flex flex-col gap-y-1 w-full'>
                    <Skeleton className='w-full h-6' />
                    <Skeleton className='w-full h-5' />
                </div>
            </div>
            <Skeleton className='w-full h-[200px]' />
        </div>
    );
};
