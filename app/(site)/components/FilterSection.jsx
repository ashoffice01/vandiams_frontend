"use client";

import { Range } from "react-range";

const CARAT_MIN = 0;
const CARAT_MAX = 20;

const PRICE_MIN = 0;
const PRICE_MAX = 50000;

export default function FilterSection({ filters, setFilters }) {
  const resetFilters = () => {
    setFilters({
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
  };

  return (
    <div className="bg-[#f3f3f3] border rounded-md p-6 text-sm">
      {/* Reset */}
      <div className="flex justify-end mb-4">
        <button
          onClick={resetFilters}
          className="text-xs underline text-gray-600 hover:text-black"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-4 gap-10">
        {/* ================= SHAPE ================= */}
        <div>
          <p className="font-semibold mb-3 tracking-wide">SHAPE</p>
          <div className="grid grid-cols-4 gap-3">
            {["Round", "Oval", "Cushion", "Pear"].map((shape) => (
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

        {/* ================= CARAT ================= */}
        <div>
          <p className="font-semibold mb-3 tracking-wide">
            CARAT SIZE
          </p>

          <div className="flex justify-between text-xs mb-2">
            <span>{filters.carat[0].toFixed(2)}</span>
            <span>{filters.carat[1].toFixed(2)}</span>
          </div>

          <Range
            values={filters.carat}
            step={0.01}
            min={CARAT_MIN}
            max={CARAT_MAX}
            onChange={(values) =>
              setFilters({ ...filters, carat: values })
            }
            renderTrack={({ props, children }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key}
                  {...rest}
                  className="h-1 bg-gray-300 rounded relative"
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
                  className="h-4 w-4 bg-black rounded-full"
                />
              );
            }}
          />
        </div>

        {/* ================= PRICE ================= */}
        <div>
          <p className="font-semibold mb-3 tracking-wide">
            PRICE
          </p>

          <div className="flex justify-between text-xs mb-2">
            <span>${filters.price[0]}</span>
            <span>${filters.price[1]}</span>
          </div>

          <Range
            values={filters.price}
            step={100}
            min={PRICE_MIN}
            max={PRICE_MAX}
            onChange={(values) =>
              setFilters({ ...filters, price: values })
            }
            renderTrack={({ props, children }) => {
              const { key, ...rest } = props;
              return (
                <div
                  key={key}
                  {...rest}
                  className="h-1 bg-gray-300 rounded relative"
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
                  className="h-4 w-4 bg-black rounded-full"
                />
              );
            }}
          />
        </div>

        {/* ================= CUT + CLARITY + PRIORITY ================= */}
        <div>
          <p className="font-semibold mb-2 tracking-wide">CUT</p>
          <div className="flex gap-2 mb-4">
            {["Excellent", "Ideal"].map((cut) => (
              <button
                key={cut}
                onClick={() =>
                  setFilters({
                    ...filters,
                    cut: filters.cut.includes(cut)
                      ? filters.cut.filter((c) => c !== cut)
                      : [...filters.cut, cut],
                  })
                }
                className={`border px-3 py-1 text-xs ${
                  filters.cut.includes(cut)
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {cut}
              </button>
            ))}
          </div>

          <p className="font-semibold mb-2 tracking-wide">
            CLARITY
          </p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {["VS2", "VS1", "VVS2", "IF"].map((clarity) => (
              <button
                key={clarity}
                onClick={() =>
                  setFilters({
                    ...filters,
                    clarity: filters.clarity.includes(
                      clarity
                    )
                      ? filters.clarity.filter(
                          (c) => c !== clarity
                        )
                      : [...filters.clarity, clarity],
                  })
                }
                className={`border px-2 py-1 text-xs ${
                  filters.clarity.includes(clarity)
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {clarity}
              </button>
            ))}
          </div>

          <p className="font-semibold mb-2 tracking-wide">
            What matters to you most?
          </p>
          <div className="flex gap-2">
            {["Price", "Quality", "View All"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setFilters({ ...filters, priority: item })
                }
                className={`border px-3 py-1 text-xs ${
                  filters.priority === item
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="flex justify-between items-center mt-6 border-t pt-4 text-xs">
        <div className="flex gap-6 items-center">
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

          <span className="font-semibold">REPORT</span>

          {["IGI", "GIA"].map((r) => (
            <label key={r} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.report.includes(r)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      report: [...filters.report, r],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      report: filters.report.filter(
                        (x) => x !== r
                      ),
                    });
                  }
                }}
              />
              {r}
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="border px-4 py-1">
            Compare Diamonds (0)
          </button>
          <button className="border px-4 py-1">
            Take A Quiz
          </button>
          <button className="border px-4 py-1">
            MORE FILTERS
          </button>
        </div>
      </div>
    </div>
  );
}