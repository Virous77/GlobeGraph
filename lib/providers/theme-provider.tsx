'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
