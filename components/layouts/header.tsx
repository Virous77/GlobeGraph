import { MainLogo } from "@/assets/logo";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className=" left-3 w-[95%] md:w-[500px] shadow-2xl  border rounded-[2rem] mb-6  backdrop-blur dark:bg-[#111111]/60 sticky top-4  z-[999999999] px-6 py-2">
      <nav className="flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <MainLogo />
        </Link>
        <ul>
          <li>
            <Link
              href="/country-gdp"
              aria-label="Country GDP"
              className=" text-sm hover:underline hover:underline-offset-4"
            >
              Country GDP
            </Link>
          </li>
          <li>
            <Link
              href="/country-per-capita-income"
              aria-label="Country Per Capita Income"
              className="text-sm hover:underline hover:underline-offset-4"
            >
              Country Per Capita Income
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
