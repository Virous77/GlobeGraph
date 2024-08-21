export const currencyFormatter = (value: number) => {
  if (value > 1_000_000_000_000) {
    return (value / 1_000_000_000_000).toFixed(2);
  } else if (value > 1_000_000) {
    return (value / 1_000_000).toFixed(2);
  }
  return value;
};
