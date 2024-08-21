import { TGDPData } from "./types";

export const getGDPData = async ({
  countryCode = "USA",
  from = 2010,
  to = 2020,
}: {
  countryCode: string;
  from?: number;
  to?: number;
}) => {
  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?date=${from}:${to}&format=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch GDP data.");
    }

    const response = await res.json();
    if (response[1].length === 0) return [];
    return response[1] as TGDPData[];
  } catch (error) {
    return [];
  }
};
