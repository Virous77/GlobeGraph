import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import QueryProvider from '@/lib/providers/query-provider';
import ThemeProvider from '@/lib/providers/theme-provider';
import { SITE_NAME, SITE_URL } from '@/lib/seo';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: 'Reetesh Kumar', url: 'https://reetesh.in/' }],
  icons: { apple: '/apple-touch-icon.png' },
  twitter: { card: 'summary_large_image', creator: '@imbitcoinb' },
};

const RootLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.className} flex min-h-dvh flex-col antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <QueryProvider>
              <Header />
              <NuqsAdapter>{children}</NuqsAdapter>
              <Footer />
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
