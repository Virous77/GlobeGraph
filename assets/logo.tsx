'use client';

import { useState } from 'react';

const defaultOpacity = {
  first: 1,
  second: 0.75,
  third: 0.5,
};

export const MainLogo = () => {
  const [fillOpacity, setFillOpacity] = useState(defaultOpacity);

  return (
    <svg
      viewBox="0 0 107.48502733074858 107.48502733074858"
      height="35.48502733074858"
      width="30.48502733074858"
      className="transition-all duration-300 ease-in-out"
      onMouseEnter={() =>
        setFillOpacity({ first: 0.5, second: 0.75, third: 1 })
      }
      onMouseLeave={() => setFillOpacity(defaultOpacity)}
    >
      <g data-palette-color="#dbdbdb">
        <rect
          width="24.379240803737947"
          height="105.48502733074858"
          fill="hsl(var(--foreground))"
          stroke="transparent"
          data-fill-palette-color="accent"
          x="0"
          fillOpacity={fillOpacity.first}
        ></rect>
        <rect
          width="24.379240803737947"
          height="105.48502733074858"
          fill="hsl(var(--foreground))"
          stroke="transparent"
          data-fill-palette-color="accent"
          x="40.82834244358286"
          fillOpacity={fillOpacity.second}
        ></rect>
        <rect
          width="24.379240803737947"
          height="105.48502733074858"
          fill="hsl(var(--foreground))"
          stroke="transparent"
          data-fill-palette-color="accent"
          x="81.65668488716572"
          fillOpacity={fillOpacity.third}
        ></rect>
      </g>
    </svg>
  );
};
