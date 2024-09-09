'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const BUTTONS = [
  {
    theme: 'light',
    icon: Sun,
    title: 'Toggle Light Mode',
  },
  {
    theme: 'dark',
    icon: Moon,
    title: 'Toggle Dark Mode',
  },
  {
    theme: 'system',
    icon: Monitor,
    title: 'Toggle System Mode',
  },
];

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-[2rem] border px-2 py-1">
      {BUTTONS.map((button) => (
        <Button
          key={button.theme}
          onClick={() => setTheme(button.theme)}
          aria-label={button.title}
          title={button.title}
          size="icon"
          className={cn(
            'h-[35px] w-[35px] rounded-[2rem] text-foreground hover:bg-accent',
            theme === button.theme ? 'bg-accent' : 'bg-transparent'
          )}
        >
          <button.icon size={20} />
        </Button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
