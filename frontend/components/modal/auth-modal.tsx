import SignInForm from '../sign-in-form';
import SignUpForm from '../sign-up-form';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { useModalStore } from '@/store/modal-store';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import GoogleIcon from '../google-icon';
import { useSignInOauth } from '@/hook/use-sign-in-oauth';

export function AuthModal() {
    const { signInWithOauth } = useSignInOauth();
    const { isOpenModal, type, authModal, setAuthModalType, onClose } =
        useModalStore();

    const openAuthModal = isOpenModal && type === 'auth';
    const login = authModal === 'login';

    useEffect(() => {}, [authModal]);

    return (
        <Dialog open={openAuthModal} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <h3 className='font-bold text-2xl w-full text-center'>
                        {login ? 'Đăng nhập' : 'Đăng ký'}
                    </h3>
                    <div className='flex items-center'>
                        <Button
                            onClick={() => signInWithOauth()}
                            variant='outline'
                            className='py-18 pl-4 bg-gray78/5 dark:bg-gray78 h-10 lg:h-[52px] rounded-[10px] w-full relative focus-visible:ring-0 focus-visible:ring-offset-0 mt-3'
                        >
                            <GoogleIcon />
                            <span className='ml-5 text-sm lg:text-base font-semibold text-gray78 dark:text-white select-none'>
                                Đăng nhập với Google
                            </span>
                        </Button>
                    </div>
                </DialogHeader>
                <Tabs defaultValue='login'>
                    {login && (
                        <div className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                            <SignInForm />
                            <div className='flex items-center justify-center gap-x-2 text-sm'>
                                <p>Bạn chưa có tài khoản?</p>
                                <TabsList className='!bg-white border-0 p-0 text-blue-400 cursor-pointer'>
                                    <span
                                        onClick={() =>
                                            setAuthModalType('register')
                                        }
                                        className='!bg-white border-0 p-0 hover:underline'
                                    >
                                        Đăng ký
                                    </span>
                                </TabsList>
                            </div>
                        </div>
                    )}
                    {!login && (
                        <div className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                            <SignUpForm />
                            <div className='flex items-center justify-center gap-x-2 text-sm'>
                                <p>Bạn đã có tài khoản?</p>
                                <div
                                    onClick={() => setAuthModalType('login')}
                                    className='!bg-white border-0 p-0 text-blue-400 cursor-pointer'
                                >
                                    <span className='!bg-white border-0 p-0 hover:underline'>
                                        Đăng nhập
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
