import { FullLogo } from '@/assets/full-logo';
import ThemeSwitcher from '../theme';

const Footer = () => {
  return (
    <footer className="mt-6 flex w-full items-center justify-between px-4 py-2 backdrop-blur dark:bg-[#111111]/60 md:px-6">
      <FullLogo />
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
