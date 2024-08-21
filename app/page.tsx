import GDPGraph from "@/components/graph/gdp-graph";
import MultiSelect from "@/components/ui/multi-select";
import { getGDPData } from "@/data-layer";

const HomePage = async () => {
  const CountryGDPData = await getGDPData({
    countryCode: "USA",
    from: 2000,
    to: 2024,
  });

  const SecondCountryGDPData = await getGDPData({
    countryCode: "CHN",
    from: 2000,
    to: 2024,
  });

  return (
    <main className="flex flex-col items-center justify-center md:p-6 p-4">
      <h1 className="text-4xl font-bold text-center sticky top-0 z-10  bg-background w-full p-2">
        Country GDP Data
      </h1>

      {CountryGDPData.length > 0 && (
        <GDPGraph
          countryGDPData={CountryGDPData}
          secondCountryGDPData={SecondCountryGDPData}
        />
      )}
      <MultiSelect />
    </main>
  );
};

export default HomePage;
