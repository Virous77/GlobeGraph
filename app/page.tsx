import GDPGraph from "@/components/graph/gdp-graph";
import GDPProvider from "@/components/graph/provider";

const HomePage = async () => {
  return (
    <main className="flex flex-col items-center justify-center md:p-6 p-4">
      <h1 className="text-4xl font-bold text-center sticky top-0 z-10  bg-background w-full p-2">
        Country GDP Data
      </h1>
      <GDPProvider>
        <GDPGraph />
      </GDPProvider>
    </main>
  );
};

export default HomePage;
