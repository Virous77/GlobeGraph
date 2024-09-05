import { FullLogo } from "@/assets/full-logo";
import ThemeSwitcher from "../theme";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between w-full  mt-6 px-6 py-2  backdrop-blur dark:bg-[#111111]/60">
      <FullLogo />
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
