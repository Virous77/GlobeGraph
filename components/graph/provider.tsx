"use client";

import { GDPContextProvider } from "@/contexts/use-gdp-context";

const GDPProvider = ({ children }: { children: React.ReactNode }) => {
  return <GDPContextProvider>{children}</GDPContextProvider>;
};

export default GDPProvider;
