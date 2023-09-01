import React, { useState, useEffect } from "react";

const CarsFiltersOptions = ({ carsList, setBrand, orderCarList }: any) => {
  const [brandList, setBrandList] = useState<any>();
  const BrandSet = new Set();

  useEffect(() => {
    if (carsList) {
      filterCarsList(carsList);
    }
  }, []);

  const filterCarsList = (e: any) => {
    carsList.forEach((element: any) => {
      BrandSet.add(element.carBrand);
    });
    setBrandList(Array.from(BrandSet));
  };

  return (
    <div className="mt-10 flex items-center justify-between">
      <div>
        <h1 className="text-[30px] font-bold">Cars Catalog</h1>
        <h2>Explore our cars you might likes</h2>
      </div>
      <div className="flex gap-5">
        <select
          className="select select-bordered bg-slate-200 text-black w-full max-w-xs"
          onChange={(e) => orderCarList(e.target.value)}
        >
          <option disabled selected>
            Price
          </option>
          <option value={-1}>Min to Max</option>
          <option value={1}>Max to Min</option>
        </select>
        <select
          className="select select-bordered bg-slate-200 text-black w-full md:block max-w-xs hidden"
          onChange={(e) => setBrand(e.target.value)}
        >
          <option disabled selected>
            Manufactural
          </option>
          {brandList &&
            brandList.map((brand: string, index: number) => (
              <option key={index}>{brand}</option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default CarsFiltersOptions;
