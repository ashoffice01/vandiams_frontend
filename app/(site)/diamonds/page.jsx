"use client";

import { useState, useEffect, useMemo } from "react";
import FilterSection from "../components/FilterSection";
import DiamondCard from "../components/DiamondCard";
import Link from "next/link";

/* ==============================
   HELPERS
==============================*/

function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeWords(str = "") {
  return str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

export default function Page() {
  const [diamondsData, setDiamondsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 8;
  const [itemsToShow, setItemsToShow] = useState(ITEMS_PER_PAGE);

  const [filters, setFilters] = useState({
    shape: "All",
    carat: [0, 20],
    price: [0, 50000],
    colorRange: [0, 6],
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
  });

  /* ==============================
     FETCH DIAMONDS
  ===============================*/
  useEffect(() => {
    async function fetchDiamonds() {
      try {
        const res = await fetch(
          "https://vandiams.com/cms/wp-json/wp/v2/diamond?_embed&per_page=100"
        );

        const data = await res.json();

        const formatted = data.map((item) => ({
          id: item.id,
          image:
            item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
          shape: item.acf?.shape?.[0]
            ? capitalize(item.acf.shape[0])
            : "",
          color: item.acf?.color?.[0]
            ? item.acf.color[0].toUpperCase()
            : "",
          clarity: item.acf?.clarity?.[0]
            ? item.acf.clarity[0].toUpperCase()
            : "",
          cut: item.acf?.cut?.[0]
            ? capitalizeWords(item.acf.cut[0])
            : "",
          report: item.acf?.report?.[0]
            ? item.acf.report[0].toUpperCase()
            : "",
          carat: Number(item.acf?.carat) || 0,
          price: Number(item.acf?.price) || 0,
          lwRatio: Number(item.acf?.lwratio) || 0,
          table: Number(item.acf?.table) || 0,
          depth: Number(item.acf?.depth) || 0,
          polish: item.acf?.polish
            ? capitalizeWords(item.acf.polish)
            : "",
          fluor: item.acf?.fluor
            ? capitalizeWords(item.acf.fluor)
            : "",
          symmetry: item.acf?.symmetry
            ? capitalizeWords(item.acf.symmetry)
            : "",
          quickShip: Boolean(item.acf?.quickship),
        }));

        setDiamondsData(formatted);
      } catch (error) {
        console.error("Diamond fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDiamonds();
  }, []);

  useEffect(() => {
    setItemsToShow(ITEMS_PER_PAGE);
  }, [filters]);

  /* ==============================
     FILTERING LOGIC
  ===============================*/

  const COLOR_SCALE = ["J", "I", "H", "G", "F", "E", "D"];
  const CLARITY_SCALE = [
    "I1", "SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF",
  ];
  const CUT_SCALE = ["Good", "Very Good", "Excellent", "Ideal"];
  const POLISH_SCALE = ["Fair", "Good", "Very Good", "Excellent", "Ideal"];
  const FLUOR_SCALE = ["Very Strong", "Strong", "Medium", "Faint", "None"];
  const SYMMETRY_SCALE = ["Good", "Very Good", "Excellent", "Ideal"];

  const filteredDiamonds = useMemo(() => {
    let result = diamondsData.filter((d) => {
      return (
        (filters.shape === "All" || d.shape === filters.shape) &&
        d.carat >= filters.carat[0] &&
        d.carat <= filters.carat[1] &&
        d.price >= filters.price[0] &&
        d.price <= filters.price[1] &&
        (d.color === "" ||
          (COLOR_SCALE.indexOf(d.color) >= filters.colorRange[0] &&
            COLOR_SCALE.indexOf(d.color) <= filters.colorRange[1])) &&
        (d.cut === "" ||
          (CUT_SCALE.indexOf(d.cut) >= filters.cutRange[0] &&
            CUT_SCALE.indexOf(d.cut) <= filters.cutRange[1])) &&
        (d.clarity === "" ||
          (CLARITY_SCALE.indexOf(d.clarity) >= filters.clarityRange[0] &&
            CLARITY_SCALE.indexOf(d.clarity) <= filters.clarityRange[1])) &&
        d.lwRatio >= filters.lwRatio[0] &&
        d.lwRatio <= filters.lwRatio[1] &&
        d.table >= filters.table[0] &&
        d.table <= filters.table[1] &&
        d.depth >= filters.depth[0] &&
        d.depth <= filters.depth[1] &&
        (!filters.quickShip || d.quickShip) &&
        (filters.report.length === 0 ||
          filters.report.includes(d.report))
      );
    });

    // SEARCH
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter((d) =>
        Object.values(d).some((val) =>
          String(val).toLowerCase().includes(search)
        )
      );
    }

    // SORT
    if (filters.sort === "price-low")
      result.sort((a, b) => a.price - b.price);

    if (filters.sort === "price-high")
      result.sort((a, b) => b.price - a.price);

    if (filters.sort === "carat-low")
      result.sort((a, b) => a.carat - b.carat);

    if (filters.sort === "carat-high")
      result.sort((a, b) => b.carat - a.carat);

    return result;
  }, [diamondsData, filters]);

  const visibleDiamonds = filteredDiamonds.slice(0, itemsToShow);
  const [view, setView] = useState("grid");

  /* ==============================
     SKELETON LOADER
  ===============================*/

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-6 animate-pulse">
        <div className="text-xs text-gray-300 mb-4">
          Home | Search Lab Grown Diamonds
        </div>

        <div className="h-8 bg-gray-200 w-1/3 mx-auto mb-6 rounded"></div>

        <div className="h-32 bg-gray-200 rounded mb-10"></div>

        <div className="flex justify-between items-center mb-6">
          <div className="h-4 bg-gray-200 w-40 rounded"></div>
          <div className="h-8 bg-gray-200 w-48 rounded"></div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-xl p-4 space-y-4">
              <div className="bg-gray-200 aspect-square rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  /* ==============================
     ORIGINAL CONTENT (UNCHANGED)
  ===============================*/

  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      <div className="text-xs text-gray-500 mb-4">
        Home | Search Lab Grown Diamonds
      </div>

      <h1 className="text-3xl font-semibold text-center mb-6">
        Search Lab Grown Diamonds
      </h1>

      <FilterSection filters={filters} setFilters={setFilters} />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-8 mb-6">

        {/* Diamonds Count */}
        <p className="text-sm font-medium text-center sm:text-left">
          DIAMONDS AVAILABLE:{" "}
          <span className="font-semibold">
            {filteredDiamonds.length.toLocaleString()}
          </span>
        </p>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">

          {/* Grid / List Toggle */}
          <div className="flex border w-full sm:w-auto">
            <button
              onClick={() => setView("grid")}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm ${view === "grid" ? "bg-black text-white" : "bg-white"
                }`}
            >
              Grid
            </button>

            <button
              onClick={() => setView("list")}
              className={`flex-1 sm:flex-none px-4 py-2 text-sm ${view === "list" ? "bg-black text-white" : "bg-white"
                }`}
            >
              List
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters({ ...filters, sort: e.target.value })
            }
            className="border px-3 py-2 text-sm w-full sm:w-auto"
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="carat-low">Carat: Low to High</option>
            <option value="carat-high">Carat: High to Low</option>
          </select>

        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {visibleDiamonds.map((diamond) => (
            <Link key={diamond.id} href={`/diamonds/detail?id=${diamond.id}`}>
              <DiamondCard {...diamond} />
            </Link>
          ))}
        </div>
      ) : (
        /* LIST VIEW (UNCHANGED FROM YOUR ORIGINAL) */
        <div className="mt-4">

          {/* ===== DESKTOP HEADER ===== */}
          <div className="hidden md:grid grid-cols-[80px_repeat(10,1fr)_80px_80px_110px] text-xs uppercase text-gray-600 border-b pb-3">
            <div></div>
            <div>Shape</div>
            <div>Carat</div>
            <div>Color</div>
            <div>Clarity</div>
            <div>Cut</div>
            <div>Cert.</div>
            <div>Polish</div>
            <div>Symmetry</div>
            <div>Depth</div>
            <div>Price</div>
            <div>Compare</div>
            <div>Wishlist</div>
            <div></div>
          </div>

          {visibleDiamonds.map((diamond) => (
            <div key={diamond.id}>

              {/* ===== DESKTOP ROW ===== */}
              <div className="hidden md:grid grid-cols-[80px_repeat(10,1fr)_80px_80px_110px] items-center border-b py-6 text-sm">

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 border rounded-full flex items-center justify-center text-xs">
                    360°
                  </div>
                </div>

                <div>{diamond.shape}</div>
                <div>{diamond.carat} ct</div>
                <div>{diamond.color}</div>
                <div>{diamond.clarity}</div>
                <div>{diamond.cut}</div>
                <div>{diamond.report}</div>
                <div>{diamond.polish}</div>
                <div>{diamond.symmetry}</div>
                <div>{diamond.depth}%</div>

                <div className="font-semibold">
                  ${diamond.price.toLocaleString()}
                </div>

                <div>
                  <input type="checkbox" />
                </div>

                <div className="text-xl cursor-pointer">♡</div>

                <div>
                  <Link href={`/diamonds/detail?id=${diamond.id}`}>
                    <button className="bg-black text-white px-4 py-2 text-xs hover:opacity-80 transition">
                      DETAILS
                    </button>
                  </Link>
                </div>
              </div>

              {/* ===== MOBILE CARD ===== */}
              <div className="md:hidden border rounded-lg p-4 mb-4 space-y-4">

                {/* Top Row */}
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 border rounded-full flex items-center justify-center text-xs">
                    360°
                  </div>

                  <div className="text-lg font-semibold">
                    ${diamond.price.toLocaleString()}
                  </div>
                </div>

                {/* Main Specs */}
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div><span className="text-gray-500">Shape:</span> {diamond.shape}</div>
                  <div><span className="text-gray-500">Carat:</span> {diamond.carat} ct</div>
                  <div><span className="text-gray-500">Color:</span> {diamond.color}</div>
                  <div><span className="text-gray-500">Clarity:</span> {diamond.clarity}</div>
                  <div><span className="text-gray-500">Cut:</span> {diamond.cut}</div>
                  <div><span className="text-gray-500">Cert:</span> {diamond.report}</div>
                  <div><span className="text-gray-500">Polish:</span> {diamond.polish}</div>
                  <div><span className="text-gray-500">Symmetry:</span> {diamond.symmetry}</div>
                  <div><span className="text-gray-500">Depth:</span> {diamond.depth}%</div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" />
                    Compare
                  </label>

                  <div className="text-xl cursor-pointer">♡</div>

                  <Link href={`/diamonds/detail?id=${diamond.id}`}>
                    <button className="bg-black text-white px-4 py-2 text-xs hover:opacity-80 transition">
                      DETAILS
                    </button>
                  </Link>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {itemsToShow < filteredDiamonds.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() =>
              setItemsToShow((prev) => prev + ITEMS_PER_PAGE)
            }
            className="border px-8 py-3 text-sm hover:bg-black hover:text-white transition"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}