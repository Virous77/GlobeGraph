import React, { useEffect, useMemo, useState } from "react";
import MainSelect from "../custom-ui/main-select";
import { useGDPStore } from "@/store/use-gdp";

type TTimeRange = {
  value: string;
  name: string;
};

const TimeRange = ({
  fetchGDPData,
}: {
  fetchGDPData: (timeRange: { from: number; to: number }) => void;
}) => {
  const { timeRange, setTimeRange } = useGDPStore();
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

  const fromRange = useMemo(() => {
    return range.filter((r) => parseInt(r.value) < timeRange.to);
  }, [range, timeRange.to]);

  const toRange = useMemo(() => {
    return range.filter((r) => parseInt(r.value) > timeRange.from);
  }, [range, timeRange.from]);

  return (
    <div
      className="flex items-center  gap-1   border"
      style={{
        borderRadius: "1rem",
      }}
    >
      <MainSelect
        id="from"
        data={fromRange}
        placeholder="From"
        classNames={{
          trigger: " bg-transparent border-none rounded-[1rem]",
        }}
        value={timeRange.from.toString()}
        onChange={(value) => {
          const newTimeRange = { from: parseInt(value), to: timeRange.to };
          setTimeRange(newTimeRange);
          fetchGDPData(newTimeRange);
        }}
      />
      -
      <MainSelect
        id="to"
        data={toRange}
        placeholder="To"
        classNames={{
          trigger: " bg-transparent border-none rounded-[1rem]",
        }}
        value={timeRange.to.toString()}
        onChange={(value) => {
          const newTimeRange = { from: timeRange.from, to: parseInt(value) };
          setTimeRange(newTimeRange);
          fetchGDPData(newTimeRange);
        }}
      />
    </div>
  );
};

export default TimeRange;
