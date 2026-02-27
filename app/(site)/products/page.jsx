"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Shapes } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function RingsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("best");
  const [inStockOnly, setInStockOnly] = useState(false);

  const [selectedMetal, setSelectedMetal] = useState([]);
  const [selectedStone, setSelectedStone] = useState([]);
  const [selectedShape, setSelectedShape] = useState([]);

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [caratRange, setCaratRange] = useState([0, 3]);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =============================
     FETCH PRODUCTS FROM WORDPRESS
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
          price: item.acf?.price || 0,
          metal: item.acf?.metal || "",
          stone: item.acf?.stone || "",
          shape: item.acf?.shape || "",
          carat: item.acf?.carat || 0,
          stock: item.acf?.stock ?? true,
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
     FILTER + SORT LOGIC
  ============================== */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (inStockOnly) {
      result = result.filter((p) => p.stock);
    }

    if (selectedMetal.length > 0) {
      result = result.filter((p) =>
        selectedMetal.includes(p.metal)
      );
    }

    if (selectedStone.length > 0) {
      result = result.filter((p) =>
        selectedStone.includes(p.stone)
      );
    }

    if (selectedShape.length > 0) {
      result = result.filter((p) =>
        selectedShape.includes(p.shape)
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
        result.reverse();
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

  /* =============================
     HELPERS
  ============================== */

  const toggleArrayValue = (value, array, setter) => {
    if (array.includes(value)) {
      setter(array.filter((v) => v !== value));
    } else {
      setter([...array, value]);
    }
  };

  return (
    <main className="min-h-screen bg-white">

      {/* ================= TOP BAR ================= */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4 sm:px-6 md:px-12 py-4 border-b text-sm gap-4">

        <div>{filteredProducts.length} Items</div>

        <div className="flex flex-wrap items-center gap-6">

          {/* In Stock Toggle */}
          <div className="flex items-center gap-2">
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

          <button
            onClick={() => setShowFilter(true)}
            className="border px-4 py-1"
          >
            Filter
          </button>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="best">Best Sellers</option>
            <option value="new">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* ================= FILTER PANEL ================= */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="bg-[#f3f3f3] w-full sm:w-[500px] h-full overflow-y-auto px-6 sm:px-10 py-10">
            <div className="flex justify-between mb-8">
              <button
                onClick={() => {
                  setSelectedMetal([]);
                  setSelectedStone([]);
                  setSelectedShape([]);
                  setPriceRange([0, 5000]);
                  setCaratRange([0, 3]);
                }}
                className="underline"
              >
                RESET
              </button>

              <button onClick={() => setShowFilter(false)}>✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

              <div>
                <h3 className="mb-4 font-medium">Shape</h3>
                {["Round", "Oval", "Cushion"].map((shape) => (
                  <label key={shape} className="block mb-3 text-sm">
                    <input
                      type="checkbox"
                      onChange={() =>
                        toggleArrayValue(
                          shape,
                          selectedShape,
                          setSelectedShape
                        )
                      }
                    />{" "}
                    {shape}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="mb-4 font-medium">Metal</h3>
                {["Platinum", "Yellow Gold", "Rose Gold"].map((metal) => (
                  <label key={metal} className="block mb-3 text-sm">
                    <input
                      type="checkbox"
                      onChange={() =>
                        toggleArrayValue(
                          metal,
                          selectedMetal,
                          setSelectedMetal
                        )
                      }
                    />{" "}
                    {metal}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="mb-4 font-medium">Stone</h3>
                {["Diamond", "Gemstone"].map((stone) => (
                  <label key={stone} className="block mb-3 text-sm">
                    <input
                      type="checkbox"
                      onChange={() =>
                        toggleArrayValue(
                          stone,
                          selectedStone,
                          setSelectedStone
                        )
                      }
                    />{" "}
                    {stone}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="mb-4 font-medium">Price</h3>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([0, Number(e.target.value)])
                  }
                  className="w-full"
                />
                <div className="mt-2 text-sm">
                  £0 - £{priceRange[1]}
                </div>

                <h3 className="mt-8 mb-4 font-medium">Carat</h3>
                <input
                  type="range"
                  min="0"
                  max="3"
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
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowFilter(false)}
                className="w-full border py-3 uppercase tracking-widest text-sm hover:bg-black hover:text-white transition"
              >
                VIEW {filteredProducts.length} DESIGNS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PRODUCT GRID ================= */}

      <div className="grid 
        grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-6 sm:gap-8 md:gap-12 
        px-4 sm:px-6 md:px-12 
        py-10 md:py-16">

        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse border p-4 rounded-lg"
            >
              <div className="bg-gray-200 aspect-square mb-4 rounded"></div>
              <div className="h-4 bg-gray-200 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            </div>
          ))
        ) : (
          filteredProducts.map((product) => (           
            <ProductCard {...product} />           
          ))
        )}
      </div>
    </main>
  );
}