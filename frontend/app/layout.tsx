import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import ModalProvider from '@/providers/modal-provider';
import TanstackProvider from '@/providers/tanstack-provider';
import Container from '@/components/container';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/providers/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Growth',
    description: 'Ecommerce Store',
    icons: {
        icon: [
            {
                url: '/favicon.ico',
                href: '/favicon.ico',
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='vi'>
            <body className={inter.className}>
                <TanstackProvider>
                    <AuthProvider>
                        <ModalProvider />
                        <Header />
                        <Toaster position='bottom-right' reverseOrder={false} />
                        <Container>{children}</Container>
                        <Footer />
                    </AuthProvider>
                </TanstackProvider>
            </body>
        </html>
    );
}
