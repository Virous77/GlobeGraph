import { MainLogo } from "@/assets/logo";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

const Header = () => {
  return (
    <header className=" left-3 w-[95%] md:w-[500px] shadow-2xl  border rounded-[2rem] mb-6  backdrop-blur dark:bg-[#111111]/60 sticky top-4  z-[999999999] px-6 py-2">
      <nav className="flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <MainLogo />
        </Link>

        <Link
          href="https://github.com/Virous77/GlobeGraph"
          aria-label="Github"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="icon"
            className="bg-transparent hover:opacity-80 text-foreground hover:bg-transparent w-full"
          >
            <Github />
          </Button>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
