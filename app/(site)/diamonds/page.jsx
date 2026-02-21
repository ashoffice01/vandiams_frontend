"use client";

import { useState, useMemo } from "react";
import { diamonds as diamondsData } from "../data/diamonds";
import FilterSection from "../components/FilterSection";
import DiamondCard from "../components/DiamondCard";

export default function Page() {
const [filters, setFilters] = useState({
  shape: "Round",

  carat: [0, 20],
  price: [0, 50000],

  colorRange: [0, 6],
  clarityRange: [0, 7],
  cutRange: [0, 3],

  lwRatio: [0.5, 3],
  table: [0, 100],
  depth: [0, 100],

  polishRange: [0, 4],
  fluorRange: [0, 4],
  symmetryRange: [0, 3],

  quickShip: false,
  report: [],
});

  /* ==============================
     FILTERING LOGIC
  ===============================*/
const COLOR_SCALE = ["J", "I", "H", "G", "F", "E", "D"];
const CLARITY_SCALE = [
  "I1",
  "SI2",
  "SI1",
  "VS2",
  "VS1",
  "VVS2",
  "VVS1",
  "IF",
];
const CUT_SCALE = ["Good", "Very Good", "Excellent", "Ideal"];
const POLISH_SCALE = ["Fair", "Good", "Very Good", "Excellent", "Ideal"];
const FLUOR_SCALE = ["Very Strong", "Strong", "Medium", "Faint", "None"];
const SYMMETRY_SCALE = ["Good", "Very Good", "Excellent", "Ideal"];
const filteredDiamonds = diamondsData.filter((d) => {
  return (
    // Shape
    d.shape === filters.shape &&

    // Carat
    d.carat >= filters.carat[0] &&
    d.carat <= filters.carat[1] &&

    // Price
    d.price >= filters.price[0] &&
    d.price <= filters.price[1] &&

    // Color range
    COLOR_SCALE.indexOf(d.color) >= filters.colorRange[0] &&
    COLOR_SCALE.indexOf(d.color) <= filters.colorRange[1] &&

    // Cut range
    CUT_SCALE.indexOf(d.cut) >= filters.cutRange[0] &&
    CUT_SCALE.indexOf(d.cut) <= filters.cutRange[1] &&

    // Clarity range
    CLARITY_SCALE.indexOf(d.clarity) >= filters.clarityRange[0] &&
    CLARITY_SCALE.indexOf(d.clarity) <= filters.clarityRange[1] &&

    // L/W Ratio
    d.lwRatio >= filters.lwRatio[0] &&
    d.lwRatio <= filters.lwRatio[1] &&

    // Table
    d.table >= filters.table[0] &&
    d.table <= filters.table[1] &&

    // Depth
    d.depth >= filters.depth[0] &&
    d.depth <= filters.depth[1] &&

    // Polish
    POLISH_SCALE.indexOf(d.polish) >= filters.polishRange[0] &&
    POLISH_SCALE.indexOf(d.polish) <= filters.polishRange[1] &&

    // Fluorescence
    FLUOR_SCALE.indexOf(d.fluor) >= filters.fluorRange[0] &&
    FLUOR_SCALE.indexOf(d.fluor) <= filters.fluorRange[1] &&

    // Symmetry
    SYMMETRY_SCALE.indexOf(d.symmetry) >= filters.symmetryRange[0] &&
    SYMMETRY_SCALE.indexOf(d.symmetry) <= filters.symmetryRange[1] &&

    // Quick Ship
    (!filters.quickShip || d.quickShip) &&

    // Report
    (filters.report.length === 0 ||
      filters.report.includes(d.report))
  );
});

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