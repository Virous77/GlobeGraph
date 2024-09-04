import React from "react";
import MainSelect from "../custom-ui/main-select";
import { TChart } from ".";

const ChartType = ({
  chartType,
  setChartType,
}: {
  chartType: TChart;
  setChartType: (value: TChart) => void;
}) => {
  return (
    <MainSelect
      id="from"
      value={chartType}
      data={[
        {
          name: "Bar Chart",
          value: "bar",
        },
        {
          name: "Area Chart",
          value: "area",
        },
        {
          name: "Line Chart",
          value: "line",
        },
        {
          name: "Radar Chart",
          value: "radar",
        },
      ]}
      placeholder="Select Chart Type"
      classNames={{
        trigger: " bg-transparent  rounded-[1rem]",
      }}
      onChange={(value) => setChartType(value as TChart)}
    />
  );
};

export default ChartType;
