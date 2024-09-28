import React, { useMemo } from 'react';
import MainSelect from '../custom-ui/main-select';
import { TTimeRange } from '@/utils';
import { useQuery } from '@tanstack/react-query';

type TTimeRangeL = {
  value: string;
  name: string;
};

const TimeRange = ({
  timeRange,
  setTimeRange,
}: {
  timeRange: TTimeRange;
  setTimeRange: (timeRange: TTimeRange) => void;
}) => {
  const currentYear = new Date().getFullYear();
  const addTimeRange = () => {
    const range = [] as TTimeRangeL[];
    for (let i = 1974; i <= currentYear - 1; i++) {
      range.push({
        value: i.toString(),
        name: i.toString(),
      });
    }

    return range;
  };

  const { data: range } = useQuery({
    queryKey: ['timeRange', currentYear],
    queryFn: () => addTimeRange(),
  });

  const fromRange = useMemo(() => {
    return range?.filter((r) => parseInt(r.value) < timeRange.to);
  }, [range, timeRange.to]);

  const toRange = useMemo(() => {
    return range?.filter((r) => parseInt(r.value) > timeRange.from);
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
        data={fromRange!}
        placeholder="From"
        classNames={{
          trigger:
            ' bg-transparent border-none rounded-[1rem] w-[100px] md:w-full',
        }}
        value={timeRange.from.toString()}
        onChange={(value) => {
          const newTimeRange = { from: parseInt(value), to: timeRange.to };
          setTimeRange(newTimeRange);
        }}
      />
      -
      <MainSelect
        id="to"
        data={toRange!}
        placeholder="To"
        classNames={{
          trigger:
            ' bg-transparent border-none rounded-[1rem] w-[100px] md:w-full',
        }}
        value={timeRange.to.toString()}
        onChange={(value) => {
          const newTimeRange = { from: timeRange.from, to: parseInt(value) };
          setTimeRange(newTimeRange);
        }}
      />
    </div>
  );
};

export default TimeRange;
