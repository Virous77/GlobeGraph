import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/lib/providers/theme-provider';
import AppStart from '@/components/custom-ui/app-start';
import { commonMetaData } from '@/utils';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';

const inter = Inter({ subsets: ['latin'] });

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: '',
    desc: 'Globe Graph is a web app that visualizes the countries data like GDP, GDP per capita, and population in different years using many charts.',
    image:
      'https://res.cloudinary.com/dw6wav4jg/image/upload/v1725522213/Image_05-09-24_at_1.12_PM_hnwwl7.jpg',
    url: '/',
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AppStart>
            <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
              <Header />
              {children}
              <Footer />
            </div>
          </AppStart>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
