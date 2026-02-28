"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/ProductCard";

export default function RingsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("best");
  const [inStockOnly, setInStockOnly] = useState(true);

  const [selectedMetal, setSelectedMetal] = useState([]);
  const [selectedStone, setSelectedStone] = useState([]);
  const [selectedShape, setSelectedShape] = useState([]);

  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [caratRange, setCaratRange] = useState([0, 100]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ NEW: Pagination
  const [visibleCount, setVisibleCount] = useState(12);

  /* =============================
     VALUE MAPS (SLUG -> LABEL)
  ============================== */

  const METALS = [
    { label: "Platinum", value: "platinum" },
    { label: "Yellow Gold", value: "yellow_gold" },
    { label: "Rose Gold", value: "rose_gold" },
    { label: "White Gold", value: "white_gold" },
    { label: "Sterling Silver", value: "sterling_silver" },
  ];

  const STONES = [
    { label: "Diamond", value: "diamond" },
    { label: "Gemstone", value: "gemstone" },
    { label: "Color Diamond", value: "color_diamond" },
    { label: "No Stone", value: "no_stone" },
    { label: "Pearl", value: "pearl" },
  ];

  const SHAPES = [
    "Round", "Oval", "Cushion", "Emerald", "Pear", "Heart",
    "Radiant", "Princes", "Marquise", "Asscher", "Multi-Shape",
    "Trillion", "Baguette", "Flower", "Hexagon"
  ];

  /* =============================
     FETCH PRODUCTS
  ============================== */

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://vandiams.com/cms/wp-json/wp/v2/product?_embed"
        );

        const data = await res.json();

        const formattedProducts = data.map((item) => ({
          id: item.id,
          name: item.title?.rendered || "Product",
          price: Number(item.acf?.price) || 0,
          metal: item.acf?.metal || [],
          stone: item.acf?.stone || [],
          shape: item.acf?.shape || [],
          carat: Number(item.acf?.carat) || 0,
          stock:
            item.acf?.stock === true ||
            item.acf?.stock === 1 ||
            item.acf?.stock === "1" ||
            item.acf?.stock === "true",
          image:
            item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/placeholder.jpg",
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  /* =============================
     FILTER + SORT
  ============================== */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (inStockOnly) {
      result = result.filter((p) => p.stock === true);
    }

    if (selectedMetal.length > 0) {
      result = result.filter((p) =>
        p.metal.some((m) => selectedMetal.includes(m))
      );
    }

    if (selectedStone.length > 0) {
      result = result.filter((p) =>
        p.stone.some((s) => selectedStone.includes(s))
      );
    }

    if (selectedShape.length > 0) {
      result = result.filter((p) =>
        p.shape.some((s) => selectedShape.includes(s))
      );
    }

    result = result.filter(
      (p) =>
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        p.carat >= caratRange[0] &&
        p.carat <= caratRange[1]
    );

    switch (sort) {
      case "low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "new":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return result;
  }, [
    products,
    sort,
    inStockOnly,
    selectedMetal,
    selectedStone,
    selectedShape,
    priceRange,
    caratRange,
  ]);

  // ✅ Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [
    sort,
    inStockOnly,
    selectedMetal,
    selectedStone,
    selectedShape,
    priceRange,
    caratRange,
  ]);

  const toggleArrayValue = (value, array, setter) => {
    if (array.includes(value)) {
      setter(array.filter((v) => v !== value));
    } else {
      setter([...array, value]);
    }
  };

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-white">

      {/* TOP BAR */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 sm:px-6 py-4 border-b text-sm">

  {/* Items Count */}
  <div className="text-center sm:text-left">
    {filteredProducts.length} Items
  </div>

  {/* Controls */}
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">

    {/* In-Stock Toggle */}
    <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
      <span>In-Stock</span>
      <button
        onClick={() => setInStockOnly(!inStockOnly)}
        className={`w-10 h-5 rounded-full relative transition ${
          inStockOnly ? "bg-black" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition ${
            inStockOnly ? "right-0.5" : "left-0.5"
          }`}
        />
      </button>
    </div>

    {/* Filter Button */}
    <button
      onClick={() => setShowFilter(true)}
      className="border px-4 py-2 w-full sm:w-auto"
    >
      Filter
    </button>

    {/* Sort Dropdown */}
    <select
      onChange={(e) => setSort(e.target.value)}
      className="border px-3 py-2 w-full sm:w-auto"
    >
      <option value="best">Best Sellers</option>
      <option value="new">Newest</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>

  </div>
</div>

      {/* FILTER PANEL */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-[#f3f3f3] w-full sm:w-[600px] h-full overflow-y-auto p-8">

            <div className="flex justify-between mb-8">
              <button
                onClick={() => {
                  setSelectedMetal([]);
                  setSelectedStone([]);
                  setSelectedShape([]);
                  setPriceRange([0, 500000]);
                  setCaratRange([0, 100]);
                }}
                className="underline"
              >
                RESET
              </button>
              <button onClick={() => setShowFilter(false)}>✕</button>
            </div>

            {/* SHAPE */}
            <h3 className="mb-4 font-medium">Shape</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {SHAPES.map((shape) => (
                <label key={shape} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedShape.includes(shape)}
                    onChange={() =>
                      toggleArrayValue(shape, selectedShape, setSelectedShape)
                    }
                  />
                  {shape}
                </label>
              ))}
            </div>

            {/* METAL & STONE */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-10 mt-8">

              <div>
                <h3 className="mb-4 font-medium">Metal</h3>
                <div className="space-y-2">
                  {METALS.map((metal) => (
                    <label key={metal.value} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedMetal.includes(metal.value)}
                        onChange={() =>
                          toggleArrayValue(
                            metal.value,
                            selectedMetal,
                            setSelectedMetal
                          )
                        }
                      />
                      {metal.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-medium">Stone</h3>
                <div className="space-y-2">
                  {STONES.map((stone) => (
                    <label key={stone.value} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedStone.includes(stone.value)}
                        onChange={() =>
                          toggleArrayValue(
                            stone.value,
                            selectedStone,
                            setSelectedStone
                          )
                        }
                      />
                      {stone.label}
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* PRICE */}
            <h3 className="mt-8 mb-4 font-medium">Price</h3>
            <input
              type="range"
              min="0"
              max="500000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([0, Number(e.target.value)])
              }
              className="w-full"
            />
            <div className="mt-2 text-sm">
              £0 - £{priceRange[1]}
            </div>

            {/* CARAT */}
            <h3 className="mt-8 mb-4 font-medium">Carat</h3>
            <input
              type="range"
              min="0"
              max="100"
              step="0.5"
              value={caratRange[1]}
              onChange={(e) =>
                setCaratRange([0, Number(e.target.value)])
              }
              className="w-full"
            />
            <div className="mt-2 text-sm">
              0 - {caratRange[1]} Ct
            </div>

            <button
              onClick={() => setShowFilter(false)}
              className="w-full border py-3 mt-10 uppercase text-sm hover:bg-black hover:text-white"
            >
              VIEW {filteredProducts.length} DESIGNS
            </button>
          </div>
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-12 py-16">

        {loading &&
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="animate-pulse space-y-4">
              <div className="bg-gray-200 h-64 w-full rounded"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            </div>
          ))}

        {!loading &&
          visibleProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </div>

      {/* VIEW MORE */}
      {!loading && visibleCount < filteredProducts.length && (
        <div className="flex justify-center pb-16">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="border px-8 py-3 uppercase text-sm hover:bg-black hover:text-white transition"
          >
            View More
          </button>
        </div>
      )}
    </main>
  );
}