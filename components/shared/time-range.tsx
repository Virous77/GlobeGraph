import React, { useEffect, useMemo, useState } from 'react';
import MainSelect from '../custom-ui/main-select';
import { TTimeRange } from '@/store/use-gdp';

type TTimeRangeL = {
  value: string;
  name: string;
};

const TimeRange = ({
  fetchGDPData,
  timeRange,
  setTimeRange,
}: {
  fetchGDPData: (timeRange: { from: number; to: number }) => void;
  timeRange: TTimeRange;
  setTimeRange: (timeRange: TTimeRange) => void;
}) => {
  const [range, setRange] = useState<TTimeRangeL[]>([]);

  useEffect(() => {
    const from = 1974;
    const to = 2024;

    const addTimeRange = () => {
      const range = [] as TTimeRangeL[];
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
      className="flex items-center gap-1 border"
      style={{
        borderRadius: '1rem',
      }}
    >
      <MainSelect
        id="from"
        data={fromRange}
        placeholder="From"
        classNames={{
          trigger:
            ' bg-transparent border-none rounded-[1rem] w-[100px] md:w-full',
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
          trigger:
            ' bg-transparent border-none rounded-[1rem] w-[100px] md:w-full',
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
