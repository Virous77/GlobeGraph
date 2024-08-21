"use client";

import React from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { TGDPData } from "@/data-layer/types";
import { currencyFormatter } from "@/utils";
import { createChartConfig } from "./config";

const GDPGraph = ({
  countryGDPData,
  secondCountryGDPData,
}: {
  countryGDPData: TGDPData[];
  secondCountryGDPData?: TGDPData[];
}) => {
  const chartConfig = createChartConfig([
    { name: "country", label: "Country GDP" },
    { name: "countryTwo", label: "Country Two GDP" },
  ]);

  const chartData = (data: TGDPData[]) => {
    if (!secondCountryGDPData) return [];
    return data.map((d, idx) => ({
      year: d.date,
      country: Number(currencyFormatter(d.value)),
      countryTwo: Number(currencyFormatter(secondCountryGDPData[idx].value)),
    }));
  };

  return (
    <Card className=" p-0 m-0">
      <div className=" flex items-start justify-between w-full">
        <CardHeader className="p-5">
          <CardTitle>Country GDP Growth</CardTitle>
          <CardDescription>
            {countryGDPData[0].date} -{" "}
            {countryGDPData[countryGDPData.length - 1].date}
          </CardDescription>
        </CardHeader>
        {secondCountryGDPData && secondCountryGDPData?.length > 0 && (
          <div className="flex items-center gap-2 p-5">
            <span className="mr-2 flex items-center">
              China GDP
              <span className="w-4 h-4 inline-block bg-[hsl(var(--chart-1))] rounded ml-2" />
            </span>
            <span className="mr-2 flex items-center">
              India GDP
              <span className="w-4 h-4 inline-block bg-[hsl(var(--chart-2))] rounded ml-2" />
            </span>
          </div>
        )}
      </div>
      <CardContent className="w-[95vw] h-[500px] p-4">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart
            accessibilityLayer
            data={chartData(countryGDPData)}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="country" fill="var(--color-country)" radius={5} />
            <Bar
              dataKey="countryTwo"
              fill="var(--color-countryTwo)"
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GDPGraph;
