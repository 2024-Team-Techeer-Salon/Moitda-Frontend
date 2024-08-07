import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import Script from 'next/script';
// import StoreProvider from './StoreProvider.tsx';
import { Montserrat } from 'next/font/google';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import QueryProviders from '../lib/QueryProvider.tsx';

const inter = Inter({ subsets: ['latin'] });
const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

export const metadata: Metadata = {
  title: 'Moitda',
  description: 'Moitda : 쉽고 간편하고 빠른 모임 관리 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link
          rel="icon"
          href="https://i.ibb.co/dgzmhY2/Moitda-Logo.png"
          sizes="any"
        />
        <QueryProviders>
          <Suspense
            fallback={
              <div className="flex h-screen w-screen items-center justify-center">
                <h1
                  className={`${mont.className} animate-bounce font-montserrat text-9xl text-black`}
                >
                  MOITDA
                </h1>
              </div>
            }
          >
            <Header />
            {/* <StoreProvider> */}
            <Script
              type="text/javascript"
              src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
              strategy="beforeInteractive"
            ></Script>
            <div className="flex min-h-screen min-w-full">{children}</div>
            {/* </StoreProvider> */}
            <Footer />
          </Suspense>
        </QueryProviders>
      </body>
    </html>
  );
}
