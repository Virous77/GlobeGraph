import React, { useEffect, useState } from "react";
import MainSelect from "../custom-ui/main-select";
import { useGDP } from "@/contexts/use-gdp-context";

type TTimeRange = {
  value: string;
  name: string;
};

const TimeRange = () => {
  const { timeRange, setTimeRange } = useGDP();
  const [range, setRange] = useState<TTimeRange[]>([]);

  useEffect(() => {
    const from = 1974;
    const to = 2024;

    const addTimeRange = () => {
      const range = [] as TTimeRange[];
      for (let i = from; i <= to; i++) {
        range.push({
          value: i.toString(),
          name: i.toString(),
        });
      }
      setRange(range);
    };
    addTimeRange();
  }, []);

  return (
    <div className="flex items-center  gap-1 px-2 py-1  border rounded-lg">
      <MainSelect
        data={range}
        placeholder="From"
        classNames={{
          trigger: " bg-transparent border-none",
        }}
        value={timeRange.from.toString()}
        onChange={(value) => {
          setTimeRange((prev) => ({
            ...prev,
            from: parseInt(value),
          }));
        }}
      />
      -
      <MainSelect
        data={range}
        placeholder="To"
        classNames={{
          trigger: " bg-transparent border-none",
        }}
        value={timeRange.to.toString()}
        onChange={(value) => {
          setTimeRange((prev) => ({
            ...prev,
            to: parseInt(value),
          }));
        }}
      />
    </div>
  );
};

export default TimeRange;
