import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';
import Header from './components/header.tsx';
import Footer from './components/footer.tsx';

const inter = Inter({ subsets: ['latin'] });

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
        <link rel="icon" href="https://i.ibb.co/kyrZGk4/fhrh.png" sizes="any" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
