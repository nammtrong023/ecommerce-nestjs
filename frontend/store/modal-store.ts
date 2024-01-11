import { ProductType } from '@/types';
import { create } from 'zustand';

type ModalType = 'preview' | 'alert' | 'auth' | 'checkout' | null;
type AuthModalType = 'login' | 'register';

interface IModalStore {
    item?: ProductType;
    isOpenModal: boolean;
    type: ModalType;
    isOpenSelect: boolean;
    authModal: AuthModalType | null;
    setAuthModalType: (type: AuthModalType) => void;
    setIsOpenSelect: (state: boolean) => void;
    onOpenModal: (type: ModalType, item?: ProductType) => void;
    onClose: () => void;
}

const useModalStore = create<IModalStore>((set) => ({
    item: undefined,
    type: null,
    authModal: 'login',
    isOpenModal: false,
    isOpenSelect: false,
    setAuthModalType: (state: AuthModalType) =>
        set(() => ({ authModal: state })),
    setIsOpenSelect: () => set(() => ({ isOpenSelect: false })),
    onOpenModal: (type: ModalType, item?: ProductType) =>
        set({ type, item, isOpenModal: true }),
    onClose: () => set({ isOpenModal: false }),
}));

export { useModalStore };
