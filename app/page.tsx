"use client";

// import Somedata from "./components/data.json";
import { useEffect, useState } from "react";
import Countries from "./components/countries";
import axios from "axios";
import { useGetCountry } from "./components/get-countries";
import Loading from "./components/loading";

interface Country {
  name: string | { common: string };
  population: number;
  region: string;
  capital: string;
  flags?: { svg: string };
  altSpellings: string[];
}

export default function Home() {
  const [countryName, setCountryName] = useState<string>("");
  const [region, setRegion] = useState<string>("");

  const { data, isLoading } = useGetCountry({ countryName, region });

  return (
    <div className='bg-slate-100 dark:bg-gray-800 min-h-[calc(100vh-70px)]'>  
      <div className='px-10 py-5 flex items-center justify-between'>
        <div className='relative'>
          <svg
            className='size-5 absolute top-3 left-3 text-gray-400'
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              strokeLinejoin='round'
              strokeLinecap='round'></path>
          </svg>
          <input
            placeholder='Search for a country'
            className='border-gray-300 pl-10 pr-32  py-3 text-sm shadow-md focus:outline-none'
            value={countryName}
            onChange={(e) => {
              setCountryName(e.target.value);
            }}
            name='countryName'
            type='search'
          />
        </div>

        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
          }}
          className='px-2 py-3 shadow-md text-sm'>
          <option value=''>Filter by Region</option>
          <option value='Africa'>Africa</option>
          <option value='America'>America</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
        </select>
      </div>

      {isLoading ? <Loading /> : <Countries data={data} />}
    </div>
  );
}
