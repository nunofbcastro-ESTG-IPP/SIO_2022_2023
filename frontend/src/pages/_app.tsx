import '@/styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { SidebarLayout } from '../components/SidebarLayout';
import DashboardProvider from '../context/DashboardContext';
import { queryClient } from '../services/QueryClient';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardProvider>
        <div className="flex flex-col min-h-screen h-full bg-white">
          <Toaster />
          <SidebarLayout>
            <Component {...pageProps} />
          </SidebarLayout>
        </div>
      </DashboardProvider>
    </QueryClientProvider>
  );
}
