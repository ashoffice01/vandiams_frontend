"use client";

import { useState, useMemo } from "react";
import { Range, getTrackBackground } from "react-range";

/* ---------- SCALES (MATCH page.jsx) ---------- */

const COLOR = ["J", "I", "H", "G", "F", "E", "D", "A"];
const CUT = ["Good", "Very Good", "Excellent", "Ideal"];
const CLARITY = ["I1", "SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF"];
const POLISH = ["Fair", "Good", "Very Good", "Excellent", "Ideal"];
const FLUOR = ["Very Strong", "Strong", "Medium", "Faint", "None"];
const SYMMETRY = ["Good", "Very Good", "Excellent", "Ideal"];

/* ---------- REUSABLE SLIDER ---------- */

const Slider = ({ values, min, max, step, onChange }) => (
  <Range
    values={values}
    step={step}
    min={min}
    max={max}
    onChange={onChange}
    renderTrack={({ props, children }) => {
      const { key, ...rest } = props;
      return (
        <div
          key={key}
          {...rest}
          className="h-[3px] w-full rounded-full"
          style={{
            background: getTrackBackground({
              values,
              colors: ["#d1d5db", "#000", "#d1d5db"],
              min,
              max,
            }),
          }}
        >
          {children}
        </div>
      );
    }}
    renderThumb={({ props }) => {
      const { key, ...rest } = props;
      return (
        <div
          key={key}
          {...rest}
          className="h-4 w-4 bg-white border-2 border-black rounded-full shadow-sm"
        />
      );
    }}
  />
);

/* ---------- INITIAL FILTERS ---------- */

const INITIAL_FILTERS = {
  shape: "All",

  carat: [0, 20],
  price: [0, 50000],

  colorRange: [0, 7],
  clarityRange: [0, 7],
  cutRange: [0, 3],

  lwRatio: [0, 3],
  table: [0, 100],
  depth: [0, 100],

  polishRange: [0, 4],
  fluorRange: [0, 4],
  symmetryRange: [0, 3],

  quickShip: false,
  report: [],
  sort: "",
  priority: "view-all",
  search: "",
  searchInput: "",
};

export default function FilterSection({ filters, setFilters }) {
  const [expanded, setExpanded] = useState(true);

  const SHAPES = [
    "All",
    "Round",
    "Oval",
    "Cushion",
    "Pear",
    "Emerald",
    "Radiant",
    "Princess",
    "Marquise",
    "Asscher",
    "Heart",
  ];

  /* ---------- SEARCH SUMMARY TEXT ---------- */

  const summaryText = useMemo(() => {
    const shapeText =
      filters.shape === "All"
        ? "All diamonds"
        : `${filters.shape} diamonds`;

    const [min, max] = filters.price;

    return `${shapeText} priced between $${min} and $${max},`;
  }, [filters]);

return (
  <div className="bg-[#F5EEE2] border border-gray-300 rounded-md p-4 sm:p-6 lg:p-8 text-[13px]">

    {/* RESET */}
    <div className="flex justify-end mb-6">
      <button
        onClick={() => setFilters(INITIAL_FILTERS)}
        className="underline text-gray-600 hover:text-black"
      >
        Reset Filters
      </button>
    </div>

    {/* ================= MAIN GRID ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">

      {/* ================= SHAPE ================= */}
      <div>
        <div className="mb-3 font-semibold tracking-wide">
          SHAPE
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SHAPES.map((shape) => (
            <button
              key={shape}
              onClick={() => setFilters({ ...filters, shape })}
              className={`border p-3 text-xs transition ${
                filters.shape === shape
                  ? "border-black"
                  : "border-gray-300"
              }`}
            >
              {shape}
            </button>
          ))}
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">

          {/* CARAT */}
          <div>
            <div className="flex justify-between mb-2 font-semibold flex-wrap gap-2">
              <span>CARAT</span>
              <div className="flex gap-2">
                <input
                  className="w-16 border text-center py-1"
                  value={filters.carat[0]}
                  readOnly
                />
                <span>-</span>
                <input
                  className="w-16 border text-center py-1"
                  value={filters.carat[1]}
                  readOnly
                />
              </div>
            </div>

            <Slider
              values={filters.carat}
              min={0}
              max={20}
              step={0.01}
              onChange={(v) =>
                setFilters({ ...filters, carat: v })
              }
            />
          </div>

          {/* PRICE */}
          <div>
            <div className="flex justify-between mb-2 font-semibold flex-wrap gap-2">
              <span>PRICE</span>
              <div className="flex gap-2">
                <input
                  className="w-20 border text-center py-1"
                  value={`$${filters.price[0]}`}
                  readOnly
                />
                <span>-</span>
                <input
                  className="w-20 border text-center py-1"
                  value={`$${filters.price[1]}`}
                  readOnly
                />
              </div>
            </div>

            <Slider
              values={filters.price}
              min={0}
              max={50000}
              step={100}
              onChange={(v) =>
                setFilters({ ...filters, price: v })
              }
            />
          </div>

          {/* COLOR */}
          <div>
            <div className="font-semibold mb-2">COLOR</div>
            <Slider
              values={filters.colorRange}
              min={0}
              max={COLOR.length - 1}
              step={1}
              onChange={(v) =>
                setFilters({ ...filters, colorRange: v })
              }
            />
            <div className="flex justify-between text-xs mt-2">
              {COLOR.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>

          {/* CUT */}
          <div>
            <div className="font-semibold mb-2">CUT</div>
            <Slider
              values={filters.cutRange}
              min={0}
              max={CUT.length - 1}
              step={1}
              onChange={(v) =>
                setFilters({ ...filters, cutRange: v })
              }
            />
            <div className="flex justify-between text-xs mt-2">
              {CUT.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>

          {/* CLARITY */}
          <div>
            <div className="font-semibold mb-2">CLARITY</div>
            <Slider
              values={filters.clarityRange}
              min={0}
              max={CLARITY.length - 1}
              step={1}
              onChange={(v) =>
                setFilters({ ...filters, clarityRange: v })
              }
            />
            <div className="flex justify-between text-xs mt-2">
              {CLARITY.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          </div>

          {/* PRIORITY */}
          <div>
            <div className="font-semibold mb-4">
              What matters to you most?
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "Price", value: "price", sort: "price-low" },
                { label: "Quality", value: "quality", sort: "carat-high" },
                { label: "View All", value: "view-all", sort: "" },
              ].map((btn) => (
                <button
                  key={btn.value}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      priority: btn.value,
                      sort: btn.sort,
                    })
                  }
                  className={`px-4 py-2 border text-sm ${
                    filters.priority === btn.value
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* ================= BOTTOM BAR ================= */}
    <div className="mt-8 space-y-6">

      {/* CHECKBOX + BUTTON ROW */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

        <div className="flex flex-wrap items-center gap-6 text-sm">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.quickShip}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  quickShip: e.target.checked,
                })
              }
            />
            QUICK SHIP
          </label>

          <div className="flex flex-wrap items-center gap-3">
            REPORT
            {["IGI", "GIA"].map((type) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={filters.report.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        report: [...filters.report, type],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        report: filters.report.filter(
                          (r) => r !== type
                        ),
                      });
                    }
                  }}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="border px-5 py-2 w-full sm:w-auto">
            Compare Diamonds (0)
          </button>

          <button className="border px-5 py-2 w-full sm:w-auto">
            Take A Quiz
          </button>

          <button
            onClick={() => setExpanded(!expanded)}
            className="border px-5 py-2 w-full sm:w-auto"
          >
            {expanded ? "LESS FILTERS" : "MORE FILTERS"}
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={filters.searchInput || ""}
          onChange={(e) =>
            setFilters({
              ...filters,
              searchInput: e.target.value,
            })
          }
          placeholder={summaryText}
          className="bg-white border px-6 py-3 w-full text-sm outline-none focus:border-black"
        />

        <button
          onClick={() =>
            setFilters({
              ...filters,
              search: filters.searchInput,
            })
          }
          className="bg-black text-white px-10 py-3 text-sm tracking-wide hover:opacity-90 w-full sm:w-auto"
        >
          SEARCH
        </button>
      </div>

    </div>
  </div>
);
}