import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { createChartConfig } from "./config";
import { cn } from "@/lib/utils";
import { color } from "@/utils";
import { Loader } from "../ui/loader";
import TimeRange from "./time-range";
import { TCountries, TTimeRange } from "@/store/use-gdp";
import ChartType from "./chart-type";
import { ToolTipComp } from "../ui/tooltip";
import { BadgeInfo } from "lucide-react";
import BarChartComp from "./bar-chart";
import MultiSelect from "./multi-select";
import RadarChartComp from "./radar-chart";
import AreaChartComp from "./area-chart";
import LineChartComp from "./line-chart";

export type TChart = "area" | "bar" | "line" | "radar";

type TMainChart = {
  countries: TCountries[];
  timeRange: TTimeRange;
  isLoading: boolean;
  chartData: any[];
  fetchSingleCountryGDPData: (name: string) => void;
  fetchGDPData: ({ from, to }: { from: number; to: number }) => void;
  setTimeRange: (timeRange: TTimeRange) => void;
  title: string;
  toolTipMessage: string;
  setCountries: (countries: TCountries) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
};

const MainChartComp: React.FC<TMainChart> = ({
  countries,
  timeRange,
  isLoading,
  chartData,
  fetchSingleCountryGDPData,
  fetchGDPData,
  setTimeRange,
  title,
  toolTipMessage,
  setCountries,
  removeCountry,
  removeLastCountry,
}) => {
  const [chartType, setChartType] = React.useState<TChart>("bar");

  const modifyConfig = countries.map((country) => {
    return {
      name: country.value,
      label: `${country.label}`,
    };
  });

  const chartConfig = createChartConfig(modifyConfig);

  const renderChart = (chart: string) => {
    switch (chart) {
      case "bar":
        return (
          <BarChartComp
            chartData={chartData}
            chartConfig={chartConfig}
            countries={countries}
          />
        );
      case "radar":
        return (
          <RadarChartComp chartConfig={chartConfig} chartData={chartData} />
        );
      case "area":
        return (
          <AreaChartComp chartConfig={chartConfig} chartData={chartData} />
        );
      case "line":
        return (
          <LineChartComp
            chartData={chartData}
            chartConfig={chartConfig}
            countries={countries}
          />
        );
      default:
        return (
          <BarChartComp
            chartData={chartData}
            chartConfig={chartConfig}
            countries={countries}
          />
        );
    }
  };

  return (
    <Card
      className=" p-0 m-0 mt-5"
      style={{
        borderRadius: "1rem",
      }}
    >
      <div className=" flex items-start justify-between w-full">
        <CardHeader className="p-5">
          <div className="flex items-center gap-4 -mb-1">
            <ToolTipComp name={toolTipMessage}>
              <CardTitle className="flex items-end gap-1 whitespace-nowrap">
                {title}
                <BadgeInfo
                  size={15}
                  color="hsl(var(--muted-foreground))"
                  cursor="pointer"
                />
              </CardTitle>
            </ToolTipComp>

            <div className=" md:block hidden">
              <ChartType chartType={chartType} setChartType={setChartType} />
            </div>
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
                  {country.label}
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
        <div className="w-[300px] mt-4 mr-4 md:flex  flex-col hidden">
          <MultiSelect
            countries={countries}
            fetchNewCountryData={fetchSingleCountryGDPData}
            setCountries={setCountries}
            removeCountry={removeCountry}
            removeLastCountry={removeLastCountry}
          />
          <TimeRange
            fetchGDPData={fetchGDPData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        </div>
      </div>
      <div className=" md:hidden flex items-center gap-1 px-4 -mt-4">
        <ChartType chartType={chartType} setChartType={setChartType} />
        <TimeRange
          fetchGDPData={fetchGDPData}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      </div>
      <div className="w-full md:px-0 px-3  md:w-[300px] mt-4 mr-4 block md:hidden">
        <MultiSelect
          countries={countries}
          fetchNewCountryData={fetchSingleCountryGDPData}
          setCountries={setCountries}
          removeCountry={removeCountry}
          removeLastCountry={removeLastCountry}
        />
      </div>
      <CardContent className="w-[97vw] h-[500px] px-0 py-4 md:p-4 rounded-xl">
        {renderChart(chartType)}
      </CardContent>
      {isLoading && <Loader type="full" />}
    </Card>
  );
};

export default MainChartComp;
