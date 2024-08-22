export const currencyFormatter = (value: number) => {
  if (value > 1_000_000_000_000) {
    return (value / 1_000_000_000_000).toFixed(2);
  } else if (value > 1_000_000) {
    return (value / 1_000_000).toFixed(2);
  }
  return value;
};

type TColor = {
  [key: number]: string;
};

export const color: TColor = {
  1: "bg-[hsl(var(--chart-1))]",
  2: "bg-[hsl(var(--chart-2))]",
  3: "bg-[hsl(var(--chart-3))]",
  4: "bg-[hsl(var(--chart-4))]",
  5: "bg-[hsl(var(--chart-5))]",
};
