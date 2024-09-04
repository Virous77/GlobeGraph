import React from "react";

const Header = () => {
  return (
    <header className=" w-[95%] md:w-[500px] shadow-2xl  border rounded-[2rem] mb-6  backdrop-blur dark:bg-[#111111]/60 sticky top-4 left-0 z-[999999999] px-6 py-3">
      <nav className="flex items-center justify-between">
        <h1 className=" font-mono font-bold  text-xl sm:text-2xl">
          GlobeGraph
        </h1>

        <p>About</p>
      </nav>
    </header>
  );
};

export default Header;
