import ReactPaginate from "react-paginate";
import { AiFillLeftSquare, AiFillRightSquare } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Country {
  name: string | { common: string };
  population: number;
  region: string;
  capital: string;
  flags?: { svg: string };
  cca2: string;
}

interface CountriesProps {
  data: Country[];
}

export default function Countries({ data }: CountriesProps) {
  const [page, setPage] = useState<number>(0);
  const n = 8; // number of items per page

  const filterData = useMemo<Country[]>(() => {
    return data?.filter((item, index) => {
      return index >= page * n && index < (page + 1) * n;
    });
  }, [data, page]);

  return (
    <>
      <div className='md:px-10 px-5 flex flex-wrap gap-y-10 gap-x-[2.6%] mt-10 '>
        {filterData &&
          filterData?.map((item, index) => (
            <Link
              href={`/${item?.cca2}`}
              key={index}
              className='relative flex md:w-[23%] w-full flex-col rounded-xl bg-white dark:bg-gray-800 dark:border border-white/15 bg-clip-border text-gray-700 dark:text-white shadow-lg hover:scale-105 transition-all z-10 s'>
              <Image
                width={100}
                height={10}
                src={item?.flags?.svg || "/next.svg"}
                alt='country flag'
                className='w-full rounded-t-xl h-[150px] shadow-md object-cover'
                priority
              />
              <div className='p-6 font-medium'>
                <h5 className='mb-3 font-semibold text-xl antialiased'>
                  {typeof item?.name === "string"
                    ? item?.name
                    : item?.name?.common}
                </h5>
                <h2 className='mb-0.5 '>
                  Population:
                  <span className='text-slate-500 font-normal antialiased'>
                    {" "}
                    {new Intl.NumberFormat().format(item?.population)}
                  </span>
                </h2>
                <h2 className='mb-0.5'>
                  Region:
                  <span className='text-slate-500 font-normal antialiased'>
                    {" "}
                    {item?.region}
                  </span>
                </h2>
                <h2 className='mb-0.5'>
                  Capital:
                  <span className='text-slate-500 font-normal antialiased'>
                    {" "}
                    {item?.capital && item?.capital[0]}
                  </span>
                </h2>
              </div>
            </Link>
          ))}
      </div>
      <div className='flex items-center justify-center py-10 dark:text-white'>
        <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          onPageChange={(event) => setPage(event.selected)}
          pageCount={Math.ceil(data.length / n)}
          breakLabel='...'
          previousLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillLeftSquare />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillRightSquare />
            </IconContext.Provider>
          }
        />
      </div>
    </>
  );
}
