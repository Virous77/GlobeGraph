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
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { createChartConfig } from "./config";
import MultiSelect from "../ui/multi-select";
import { cn } from "@/lib/utils";
import { color } from "@/utils";
import { Loader } from "../ui/loader";
import TimeRange from "./time-range";
import { useGDPStore } from "@/store/use-gdp";
import { useGDP } from "@/hooks/use-gdp";

const GDPGraph = () => {
  const { countries, timeRange } = useGDPStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useGDP();

  const modifyConfig = countries.map((country) => {
    return {
      name: country.value,
      label: `${country.label} GDP`,
    };
  });

  const chartConfig = createChartConfig(modifyConfig);

  return (
    <Card className=" p-0 m-0">
      <div className=" flex items-start justify-between w-full">
        <CardHeader className="p-5">
          <CardTitle>Country GDP Growth</CardTitle>
          <CardDescription>
            {chartData[0]?.year} - {chartData[chartData.length - 1]?.year}
          </CardDescription>
          {countries.length > 0 && (
            <div className="flex items-center gap-2 p-5 pl-0 pt-2">
              {countries.map((country, idx) => (
                <span
                  className="mr-2 flex items-center text-sm"
                  key={country.value}
                >
                  {country.label} GDP
                  <span
                    style={{
                      backgroundColor: color[idx],
                    }}
                    className={cn("w-3 h-3 inline-block  rounded ml-2")}
                  />
                </span>
              ))}
            </div>
          )}
        </CardHeader>
        <div className="w-[300px] mt-4 mr-4 flex  flex-col">
          <MultiSelect
            countries={countries}
            fetchNewCountryData={fetchSingleCountryGDPData}
          />
          <TimeRange fetchGDPData={fetchGDPData} />
        </div>
      </div>
      <CardContent className="w-[95vw] h-[500px] p-4">
        <ChartContainer
          config={chartConfig}
          className="w-full h-full"
          id={`${timeRange.from}-${timeRange.to}`}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
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
            {countries.map((country, idx) => (
              <Bar
                dataKey={country.value}
                fill={`var(--color-${country.value})`}
                radius={5}
                key={idx}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      {isLoading && <Loader type="full" />}
    </Card>
  );
};

export default GDPGraph;
