import React from "react";
import MainSelect from "../custom-ui/main-select";

const ChartType = ({
  chartType,
  setChartType,
}: {
  chartType: "area" | "bar" | "line";
  setChartType: (value: "area" | "bar" | "line") => void;
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
      ]}
      placeholder="Select Chart Type"
      classNames={{
        trigger: " bg-transparent",
      }}
      onChange={(value) => setChartType(value as "area" | "bar" | "line")}
    />
  );
};

export default ChartType;
