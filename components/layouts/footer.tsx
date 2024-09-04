import ThemeSwitcher from "../theme";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between w-full  mt-6 px-6 py-3 bg-accent">
      <h1 className="font-mono font-bold text-3xl">Footer</h1>
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
