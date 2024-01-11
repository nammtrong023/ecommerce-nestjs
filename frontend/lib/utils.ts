import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatMoney = (price?: string | number): string => {
    if (price === undefined) {
        return '';
    }

    const formattedPrice = Number(price).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const finalFormattedPrice = formattedPrice.replace(/\s/g, '');

    return finalFormattedPrice;
};

export const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
