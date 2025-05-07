import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useGetCountryDetails({ id }: { id: string }) {
  return useQuery({
    queryKey: ["country", id],
    queryFn: async () => {
      const res = await axios.get(
        `https://restcountries.com/v3.1/alpha?codes=${id}`
      );
      return res.data;
    },
  });
}
