import React, { useEffect, useMemo, useState } from 'react';
import MainSelect from '../custom-ui/main-select';
import { TTimeRange } from '@/utils';

type TTimeRangeL = {
  value: string;
  name: string;
};

const TimeRange = ({
  fetchCountryData,
  timeRange,
  setTimeRange,
}: {
  fetchCountryData: (timeRange: { from: number; to: number }) => void;
  timeRange: TTimeRange;
  setTimeRange: (timeRange: TTimeRange) => void;
}) => {
  const [range, setRange] = useState<TTimeRangeL[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const from = 1974;

    const addTimeRange = () => {
      const range = [] as TTimeRangeL[];
      for (let i = from; i <= currentYear - 1; i++) {
        range.push({
          value: i.toString(),
          name: i.toString(),
        });
      }
      setRange(range);
    };
    addTimeRange();
  }, [currentYear]);

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
          fetchCountryData(newTimeRange);
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
          fetchCountryData(newTimeRange);
        }}
      />
    </div>
  );
};

export default TimeRange;
