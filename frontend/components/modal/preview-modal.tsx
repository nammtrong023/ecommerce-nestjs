'use client';
import { X } from 'lucide-react';
import { useModalStore } from '@/store/modal-store';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IconButton } from '@mui/material';
import ProductDetails from '../products/product-details';

export default function PreviewModal() {
    const { isOpenModal, type, item, onClose } = useModalStore();
    const isOpenPreviewModal = isOpenModal && type === 'preview';

    if (!item) return null;

    return (
        <>
            <Transition appear show={isOpenPreviewModal} as={Fragment}>
                <Dialog
                    as='div'
                    open={isOpenPreviewModal}
                    className='relative z-10'
                    onClose={onClose}
                >
                    <div className='fixed inset-0 bg-black bg-opacity-50' />

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full max-w-5xl rounded-lg text-left align-middle'>
                                    <div className='relative w-full items-center h-fit rounded-lg bg-white px-4 pb-6 pt-10 shadow-2xl sm:px-6 sm:pt-8 md:p-6 '>
                                        <div className='absolute right-4 top-4'>
                                            <IconButton onClick={onClose}>
                                                <X size={16} />
                                            </IconButton>
                                        </div>
                                        <ProductDetails item={item} />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
