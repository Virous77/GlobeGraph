"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { createChartConfig } from "./config";
import MultiSelect from "../ui/multi-select";
import { cn } from "@/lib/utils";
import { color } from "@/utils";
import { Loader } from "../ui/loader";
import TimeRange from "./time-range";
import { useGDPStore } from "@/store/use-gdp";
import { useGDP } from "@/hooks/use-gdp";
import GDPBarChart from "./bar-chart";
import GDPAreaChart from "./area-chart";
import GDPLineChart from "./line-chart";
import ChartType from "./chart-type";
import GDPRadarChart from "./radar-chart";

export type TChart = "area" | "bar" | "line" | "radar";

const GDPGraph = () => {
  const [chartType, setChartType] = React.useState<TChart>("bar");
  const { countries } = useGDPStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useGDP();

  const modifyConfig = countries.map((country) => {
    return {
      name: country.value,
      label: `${country.label} GDP`,
    };
  });

  const chartConfig = createChartConfig(modifyConfig);

  const renderChart = (chart: string) => {
    switch (chart) {
      case "bar":
        return <GDPBarChart chartData={chartData} chartConfig={chartConfig} />;
      case "area":
        return <GDPAreaChart chartData={chartData} chartConfig={chartConfig} />;
      case "line":
        return <GDPLineChart chartData={chartData} chartConfig={chartConfig} />;
      case "radar":
        return (
          <GDPRadarChart chartData={chartData} chartConfig={chartConfig} />
        );
      default:
        return <GDPBarChart chartData={chartData} chartConfig={chartConfig} />;
    }
  };

  return (
    <Card
      className=" p-0 m-0"
      style={{
        borderRadius: "1rem",
      }}
    >
      <div className=" flex items-start justify-between w-full">
        <CardHeader className="p-5">
          <div className="flex items-center gap-4">
            <CardTitle>Country GDP Growth</CardTitle>
            <ChartType chartType={chartType} setChartType={setChartType} />
          </div>

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
      <CardContent className="w-[95vw] h-[500px] p-4  rounded-xl">
        {renderChart(chartType)}
      </CardContent>
      {isLoading && <Loader type="full" />}
    </Card>
  );
};

export default GDPGraph;
