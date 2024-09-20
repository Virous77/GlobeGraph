'use client';

import { useTheme } from 'next-themes';
import React from 'react';
import { Toaster } from 'sonner';

const ToastProvider = () => {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme === 'light' ? 'dark' : theme === 'dark' ? 'light' : 'light'}
    />
  );
};

export default ToastProvider;
