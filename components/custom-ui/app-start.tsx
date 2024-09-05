'use client';

import { FullLogo } from '@/assets/full-logo';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const AppStart = ({ children }: { children: React.ReactNode }) => {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <section
      className={cn(
        !mount &&
          'fixed left-0 top-0 flex h-[100dvh] w-full items-center justify-center bg-white'
      )}
    >
      {mount ? children : <FullLogo />}
    </section>
  );
};

export default AppStart;
