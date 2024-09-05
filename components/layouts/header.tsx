import { MainLogo } from "@/assets/logo";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className=" w-[95%] md:w-[500px] shadow-2xl  border rounded-[2rem] mb-6  backdrop-blur dark:bg-[#111111]/60 sticky top-4 left-0 z-[999999999] px-6 py-2">
      <nav className="flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <MainLogo />
        </Link>
        <p>About</p>
      </nav>
    </header>
  );
};

export default Header;
