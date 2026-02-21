"use client";

import { useState, useMemo } from "react";
import { diamonds as diamondData } from "../data/diamonds";
import FilterSection from "../components/FilterSection";
import DiamondCard from "../components/DiamondCard";

export default function Page() {
  const [filters, setFilters] = useState({
    shape: "Round",
    carat: [2.0, 16.04],
    price: [510, 38400],
    color: [],
    clarity: [],
    cut: [],
    quickShip: false,
    report: [],
    priority: "View All",
    sort: "",
  });

  /* ==============================
     FILTERING LOGIC
  ===============================*/
  const filteredDiamonds = useMemo(() => {
    let result = diamondData.filter((d) => {
      return (
        // Shape
        (!filters.shape || d.shape === filters.shape) &&

        // Carat range
        d.carat >= filters.carat[0] &&
        d.carat <= filters.carat[1] &&

        // Price range
        d.price >= filters.price[0] &&
        d.price <= filters.price[1] &&

        // Cut
        (filters.cut.length === 0 ||
          filters.cut.includes(d.cut)) &&

        // Clarity
        (filters.clarity.length === 0 ||
          filters.clarity.includes(d.clarity)) &&

        // Quick Ship
        (!filters.quickShip || d.quickShip) &&

        // Report (IGI / GIA)
        (filters.report.length === 0 ||
          filters.report.includes(d.report))
      );
    });

    /* ==============================
       SORTING LOGIC
    ===============================*/
    if (filters.sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (filters.sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (filters.sort === "carat-low") {
      result.sort((a, b) => a.carat - b.carat);
    }

    if (filters.sort === "carat-high") {
      result.sort((a, b) => b.carat - a.carat);
    }

    return result;
  }, [filters]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-6">

      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-4">
        Home | Search Lab Grown Diamonds
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-center mb-6">
        Search Lab Grown Diamonds
      </h1>

      {/* FILTER SECTION */}
      <FilterSection
        filters={filters}
        setFilters={setFilters}
      />

      {/* Results Header */}
      <div className="flex justify-between items-center mt-6 mb-4">
        <p className="text-sm font-medium">
          DIAMONDS AVAILABLE:{" "}
          <span className="font-semibold">
            {filteredDiamonds.length.toLocaleString()}
          </span>
        </p>

        <div className="flex items-center gap-4">

          {/* Visual / List Toggle (UI only) */}
          <div className="flex border rounded overflow-hidden text-xs">
            <button className="px-4 py-2 bg-black text-white">
              Visual
            </button>
            <button className="px-4 py-2 bg-white">
              List
            </button>
          </div>

          {/* Sorting */}
          <select
            className="border px-3 py-2 text-xs"
            value={filters.sort}
            onChange={(e) =>
              setFilters({
                ...filters,
                sort: e.target.value,
              })
            }
          >
            <option value="">Sort: Quick Ship</option>
            <option value="price-low">
              Price: Low to High
            </option>
            <option value="price-high">
              Price: High to Low
            </option>
            <option value="carat-low">
              Carat: Low to High
            </option>
            <option value="carat-high">
              Carat: High to Low
            </option>
          </select>
        </div>
      </div>

      {/* Diamond Grid */}
      <div className="grid grid-cols-4 gap-6">
        {filteredDiamonds.map((diamond) => (
          <DiamondCard
            key={diamond.id}
            {...diamond}
          />
        ))}
      </div>

      {/* Load More Button (UI only for now) */}
      <div className="flex justify-center mt-8">
        <button className="border px-6 py-2 text-xs hover:bg-black hover:text-white transition">
          LOAD MORE
        </button>
      </div>
    </main>
  );
}