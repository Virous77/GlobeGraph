import { MainLogo } from '@/assets/logo';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { Github } from 'lucide-react';
import Languages from '../languages';
import { cookies } from 'next/headers';

const Header = async () => {
  const lang = cookies().get('lang');
  return (
    <header className="sticky left-3 top-4 z-[99] mb-6 w-[95%] rounded-[2rem] border px-4 py-2 pr-2 shadow-2xl backdrop-blur dark:bg-[#111111]/60 md:w-[500px] md:px-6 md:pr-2">
      <nav className="flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <MainLogo />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Virous77/GlobeGraph"
            aria-label="Github"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="icon"
              className="w-full bg-transparent text-foreground hover:bg-transparent hover:opacity-80"
            >
              <Github />
            </Button>
          </Link>
          <Languages lang={lang?.value || 'en'} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
