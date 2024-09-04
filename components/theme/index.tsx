"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="border rounded-[2rem] px-2 py-1 flex items-center gap-1">
      <Button
        onClick={() => setTheme("light")}
        aria-label="Toggle Light Mode"
        title="Toggle Light Mode"
        size="icon"
        className={cn(
          "rounded-[2rem] w-[35px] h-[35px] text-foreground hover:bg-accent",
          theme === "light" ? "bg-accent  " : "bg-transparent "
        )}
      >
        <Sun size={20} />
      </Button>
      <Button
        onClick={() => setTheme("dark")}
        aria-label="Toggle Dark Mode"
        title="Toggle Dark Mode"
        size="icon"
        className={cn(
          "rounded-[2rem] w-[35px] h-[35px] text-foreground hover:bg-accent",
          theme === "dark" ? "bg-accent  " : "bg-transparent "
        )}
      >
        <Moon size={20} />
      </Button>
      <Button
        onClick={() => setTheme("system")}
        aria-label="Toggle System Mode"
        title="Toggle System Mode"
        size="icon"
        className={cn(
          "rounded-[2rem] w-[35px] h-[35px] text-foreground hover:bg-accent",
          theme === "system" ? "bg-accent  " : "bg-transparent "
        )}
      >
        <Monitor size={20} />
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
