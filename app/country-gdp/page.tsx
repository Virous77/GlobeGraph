import GDPGraph from "@/components/gdp";
import { commonMetaData } from "@/utils";

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: "Country GDP",
    desc: "Explore the GDP of different countries using Globe Graph.",
    image:
      "https://res.cloudinary.com/dw6wav4jg/image/upload/v1725522213/Image_05-09-24_at_1.12_PM_hnwwl7.jpg",
    url: "/country-gdp",
    keywords: ["geo chart"],
  });
  return {
    ...metaData,
  };
};

const CountryGDPPage = () => {
  return (
    <main>
      <section className="p-1">
        <GDPGraph />
      </section>
    </main>
  );
};

export default CountryGDPPage;
