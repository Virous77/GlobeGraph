import PerCapita from "@/components/per-capita";
import { commonMetaData } from "@/utils";
import React from "react";

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: "Country Per Capita Income",
    desc: "Explore the per capita income of different countries using Globe Graph.",
    image:
      "https://res.cloudinary.com/dw6wav4jg/image/upload/v1725522213/Image_05-09-24_at_1.12_PM_hnwwl7.jpg",
    url: "/country-per-capita-income",
    keywords: ["geo chart"],
  });
  return {
    ...metaData,
  };
};

const CountryPerCapitaIncomePage = () => {
  return (
    <main>
      <section className="p-3">
        <PerCapita />
      </section>
    </main>
  );
};

export default CountryPerCapitaIncomePage;
