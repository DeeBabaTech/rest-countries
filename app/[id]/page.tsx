"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetCountryDetails } from "../components/get-country-details";
import Loading from "../components/loading";
import { FaLongArrowAltLeft } from "react-icons/fa";

interface NativeName {
  official: string;
}

interface CountryItem {
  name: {
    common: string;
    nativeName: {
      [key: string]: NativeName;
    };
  };
  population: number;
  region: string;
  capital: string;
  flags?: { svg: string };
  subregion?: string;
  tld?: string[];
  currencies?: {
    [key: string]: { name: string; symbol: string };
  };
  languages?: {
    [key: string]: string;
  };
  borders: string[];
}

function Country({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();

  const { data: countryData, isLoading: isCountryLoading } =
    useGetCountryDetails({ id });

  const country: CountryItem | undefined = countryData?.[0];

  const borderIds = country?.borders?.join(",") || "";

  const { data: borderCountries, isLoading: isBordersLoading } =
    useGetCountryDetails({ id: borderIds });

  if (isCountryLoading) return <Loading />;

  if (!country)
    return (
      <div className='text-center text-2xl pt-20 h-[calc(100vh-70px)] dark:bg-gray-800 dark:text-white'>
        Country not found. Please try again.
      </div>
    );

  const nativeNameKey = Object.keys(country.name.nativeName || {})[0];

  return (
    <div className='p-10 dark:bg-gray-800 dark:!text-white min-h-[calc(100vh-70px)]'>
      <div
        onClick={() => router.back()}
        className='flex items-center gap-1 px-3 py-1 w-fit border rounded-md cursor-pointer mb-10'>
        <FaLongArrowAltLeft /> <p>Back</p>
      </div>

      <div className='flex items-center'>
        <Image
          width={100}
          height={100}
          src={country.flags?.svg || "/next.svg"}
          alt={country.name.common}
          className='w-2/5 h-2/5 object-cover'
          priority
        />
        <div className='ml-10 '>
          <div className='text-2xl font-semibold mb-5'>
            {country.name.common}
          </div>
          <div className='flex flex-col flex-wrap max-h-40 gap-x-20 gap-y-2'>
            <h2 className='w-72 truncate'>
              Native Name:{" "}
              <span className='text-slate-500 dark:text-white/50 font-normal antialiased'>
                {country.name.nativeName?.[nativeNameKey]?.official || "N/A"}
              </span>
            </h2>
            <h2>
              Population:{" "}
              <span className='text-slate-500 dark:text-white/50 font-normal antialiased'>
                {new Intl.NumberFormat().format(country.population)}
              </span>
            </h2>
            <h2>
              Region:{" "}
              <span className='text-slate-500 dark:text-white/50 font-normal antialiased'>
                {country.region}
              </span>
            </h2>
            <h2>
              Sub Region:{" "}
              <span className='text-slate-500 dark:text-white/50 font-normal antialiased'>
                {country.subregion || "N/A"}
              </span>
            </h2>
            <h2>
              Capital:{" "}
              <span className='text-slate-500 dark:text-white/50 font-normal antialiased'>
                {country.capital}
              </span>
            </h2>
            <h2>
              Top Level Domain:{" "}
              <span className='text-slate-500 dark:text-white/50 font-normal antialiased'>
                {country.tld?.join(", ") || "N/A"}
              </span>
            </h2>
            <h2 className='w-64 truncate'>
              Currencies:{" "}
              <span className='text-slate-500 dark:text-white/50 font-normal antialiased'>
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => `${c.name} (${c.symbol})`)
                      .join(", ")
                  : "N/A"}
              </span>
            </h2>
            <h2 className='w-64 truncate'>
              Languages:{" "}
              <span className='text-slate-500 dark:text-white/50 font-normal antialiased'>
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </span>
            </h2>
          </div>
          <h2 className='mt-5'>
            Border Countries:{" "}
            <span className='flex flex-wrap text-slate-500 dark:text-white/50 antialiased'>
              {isBordersLoading
                ? "Loading..."
                : borderCountries?.length
                ? borderCountries.map((border: any, index: number) => (
                    <span
                      key={index}
                      className='mr-2 hover:underline cursor-pointer'
                      onClick={() => router.push(`/${border.cca3}`)}>
                      <div className='flex items-center gap-1'>
                        <p> {border.name.common} </p>
                        <Image
                          width={100}
                          height={100}
                          src={border.flags?.svg || "/next.svg"}
                          alt={border.name.common}
                          className='w-5 h-5 object-cover rounded-full'
                          priority
                        />
                      </div>
                    </span>
                  ))
                : "None"}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Country;
