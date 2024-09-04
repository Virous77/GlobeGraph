import GDPGraph from "@/components/gdp";
import Footer from "@/components/layouts/footer";
import Header from "@/components/layouts/header";
import dynamic from "next/dynamic";

const ThemeSwitcher = dynamic(() => import("@/components/theme"), {
  ssr: false,
});

const HomePage = async () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <Header />
      <h1 className="text-4xl font-bold text-center sticky top-0 z-10  bg-background w-full p-2 mb-3">
        Country GDP Data
      </h1>
      <GDPGraph />
      <Footer />
    </main>
  );
};

export default HomePage;
