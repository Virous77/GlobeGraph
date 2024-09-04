import ThemeSwitcher from "../theme";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between w-full  mt-6 px-6 py-3  backdrop-blur dark:bg-[#111111]/60">
      <h1 className="font-mono font-bold text-2xl sm:text-3xl ">GlobeGraph</h1>
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
