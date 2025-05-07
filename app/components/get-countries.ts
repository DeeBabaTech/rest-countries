import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useGetCountry({
  countryName,
  region,
}: {
  countryName: string;
  region: string;
}) {
  const queryData = countryName
    ? `https://restcountries.com/v3.1/name/${countryName}`
    : region
    ? `https://restcountries.com/v3.1/region/${region}`
    : "https://restcountries.com/v3.1/all";

  return useQuery({
    queryKey: ["country", countryName, region],
    queryFn: async () => {
      const res = await axios.get(queryData);
      return res.data;
    },
  });
}
