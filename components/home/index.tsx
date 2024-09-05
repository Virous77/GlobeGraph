import React from "react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";
import BackgroundDots from "../custom-ui/background";

const URLS = [
  {
    href: "/country-gdp",
    name: "Country GDP",
    color: "red",
  },
  {
    href: "/country-per-capita-income",
    name: "Country Per Capita Income",
    color: "blue",
  },
];

const Home = () => {
  return (
    <section className="border rounded-[1rem] p-5 md:w-fit w-full">
      <h1 className=" mb-3 text-2xl font-bold">Explore the data</h1>
      <div className=" flex items-center flex-wrap  gap-3 md:flex-row flex-col w-full">
        {URLS.map(({ href, name, color }) => (
          <Card
            key={href}
            className="p-0 m-0 rounded-[1rem] md:w-[300px] w-full relative"
          >
            <CardContent className=" p-3 border h-[100px] flex items-center justify-center rounded-[1rem] md:w-[300px] w-full flex-col gap-1">
              <h2 className=" text-lg relative z-10 font-semibold">{name}</h2>
              <Link
                href={href}
                className=" text-sm flex items-center gap-1 hover:underline hover:underline-offset-4 relative z-10 font-semibold"
              >
                Visit
                <SquareArrowOutUpRight size={16} />
              </Link>
              <BackgroundDots dotColor={color} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Home;
