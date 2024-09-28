import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/lib/providers/theme-provider';
import AppStart from '@/components/custom-ui/app-start';
import { commonMetaData } from '@/utils';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import ToastProvider from '@/lib/providers/toast-provider';
import ReactQueryProvider from '@/lib/providers/reactQuery-provider';

const inter = Inter({ subsets: ['latin'] });

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: '',
    desc: 'Globe Graph is a web app that visualizes the countries data like GDP, GDP per capita, and population in different years using many charts.',
    url: '/',
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              <NextTopLoader
                color="#22dd4e"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={200}
                shadow="0 0 10px #22DD4e,0 0 5px #22DD4e"
              />
              <AppStart>
                <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
                  <Header />
                  {children}
                  <Analytics />
                  <ToastProvider />
                  <Footer />
                </div>
              </AppStart>
            </ReactQueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
