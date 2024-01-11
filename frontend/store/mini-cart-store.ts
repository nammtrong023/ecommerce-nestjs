import { create } from 'zustand';
import { RefObject, createRef } from 'react';

interface IMiniCartState {
    isOpenMiniCart: boolean;
    setIsOpenMiniCart: (isOpenMiniCart: boolean) => void;
    toggleOpenMiniCart: (isOpenMiniCart: boolean) => void;
    iconCartRef: RefObject<HTMLDivElement>;
    miniCartRef: RefObject<HTMLDivElement>;
}

const useMiniCartStore = create<IMiniCartState>((set) => ({
    isOpenMiniCart: false,
    setIsOpenMiniCart: (isOpenMiniCart) => set(() => ({ isOpenMiniCart })),
    toggleOpenMiniCart: () =>
        set((state) => ({ isOpenMiniCart: !state.isOpenMiniCart })),
    iconCartRef: createRef<HTMLDivElement>(),
    miniCartRef: createRef<HTMLDivElement>(),
}));

export { useMiniCartStore };
