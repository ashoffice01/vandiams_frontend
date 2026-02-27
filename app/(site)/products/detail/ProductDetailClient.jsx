"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function ProductDetailClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { addToCart, items } = useCart();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedStyle, setSelectedStyle] = useState("1.8mm");
  const [selectedMetal, setSelectedMetal] = useState("14K Yellow Gold");
  const [selectedShape, setSelectedShape] = useState("Oval");
  const [selectedCarat, setSelectedCarat] = useState("2");
  const [ringSize, setRingSize] = useState("");

  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://vandiams.com/cms/wp-json/wp/v2/product/${id}?_embed`
        );

        if (!res.ok) {
          setProduct(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setProduct(data);

        const similarRes = await fetch(
          `https://vandiams.com/cms/wp-json/wp/v2/product?per_page=8&_embed`
        );

        if (similarRes.ok) {
          const similarData = await similarRes.json();
          const filtered = similarData
            .filter((item) => item.id !== data.id)
            .slice(0, 4);

          setSimilar(filtered);
        }
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (!id) return <div className="p-10">No product selected.</div>;

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-16 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-gray-200 aspect-square rounded-xl" />
          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-12 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) return <div className="p-10">Product not found.</div>;

  const image =
    product._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/placeholder.jpg";

  const price = product.acf?.price || 0;
  const cleanTitle = product.title.rendered.replace(/<[^>]+>/g, "");

  const alreadyInCart = items.some(
    (item) => item.name === cleanTitle
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      {/* BREADCRUMB */}
      <nav className="mb-10 text-sm text-gray-500">
        <Link href="/">Home</Link> /{" "}
        <Link href="/products">Products</Link> /{" "}
        <span className="text-black">{cleanTitle}</span>
      </nav>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* IMAGE */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={cleanTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE CONFIG */}
        <div className="space-y-8">

          <div>
            {/* PRODUCT TITLE BLOCK */}
            <div className="space-y-2">

              {(() => {
                const acf = product.acf || {};

                const shortName = acf.short_name || "";

                const carat = acf.carat || "";

                const shape = acf.shape?.[0] || "";

                const stone =
                  acf.stone?.[0]
                    ? acf.stone[0].charAt(0).toUpperCase() +
                    acf.stone[0].slice(1)
                    : "";

                const metalRaw = acf.metal?.[0] || "";

                const formattedMetal = metalRaw
                  .replace("white_gold", "14K White Gold")
                  .replace("yellow_gold", "14K Yellow Gold")
                  .replace("rose_gold", "14K Rose Gold");

                return (
                  <>
                    {/* Line 1 */}
                    <h1 className="text-2xl sm:text-3xl font-semibold leading-snug">
                      {shortName} {carat} ctw {shape} Lab Grown {stone} Engagement Ring
                    </h1>

                    {/* Line 2 */}
                    <p className="text-sm text-gray-600">
                      {formattedMetal}
                      {carat && ` | ${carat} ct Center`}
                    </p>
                  </>
                );
              })()}

            </div>
            <p className="text-3xl font-semibold mt-3">
              €{Number(price).toLocaleString()}
            </p>
          </div>

          {/* STYLE */}
          <div>
            <h3 className="font-medium mb-3">Style</h3>
            <div className="flex gap-4">
              {["1.8mm", "2.2mm"].map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-6 py-3 border ${selectedStyle === style
                      ? "border-black"
                      : "border-gray-300"
                    }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* METAL */}
          <div>
            <h3 className="font-medium mb-3">Metal</h3>
            <div className="flex gap-4">
              {["14K Yellow Gold", "Platinum", "Rose Gold"].map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`px-4 py-2 border text-sm ${selectedMetal === metal
                      ? "border-black"
                      : "border-gray-300"
                    }`}
                >
                  {metal}
                </button>
              ))}
            </div>
          </div>

          {/* SHAPE */}
          <div>
            <h3 className="font-medium mb-3">Diamond Shape</h3>
            <div className="flex gap-4">
              {["Round", "Oval", "Cushion", "Emerald"].map((shape) => (
                <button
                  key={shape}
                  onClick={() => setSelectedShape(shape)}
                  className={`px-4 py-2 border text-sm ${selectedShape === shape
                      ? "border-black"
                      : "border-gray-300"
                    }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          {/* CARAT */}
          <div>
            <h3 className="font-medium mb-3">Carat Weight</h3>
            <div className="flex gap-3 flex-wrap">
              {["1", "1.5", "2", "2.5", "3"].map((carat) => (
                <button
                  key={carat}
                  onClick={() => setSelectedCarat(carat)}
                  className={`px-4 py-2 border ${selectedCarat === carat
                      ? "border-black"
                      : "border-gray-300"
                    }`}
                >
                  {carat}
                </button>
              ))}
            </div>
          </div>

          {/* RING SIZE */}
          <div>
            <h3 className="font-medium mb-3">Ring Size</h3>
            <select
              value={ringSize}
              onChange={(e) => setRingSize(e.target.value)}
              className="border px-4 py-3 w-48"
            >
              <option value="">Select</option>
              {[...Array(10)].map((_, i) => (
                <option key={i}>{i + 4}</option>
              ))}
            </select>
          </div>

          {/* ADD TO CART */}
          <button
            disabled={alreadyInCart}
            onClick={() =>
              addToCart({
                cartId: `${product.id}-${Date.now()}`,
                name: cleanTitle,
                price: `€${Number(price).toLocaleString()}`,
                image,
              })
            }
            className={`w-full py-4 uppercase tracking-widest text-sm ${alreadyInCart
                ? "bg-gray-300"
                : "bg-black text-white hover:bg-gray-800"
              }`}
          >
            {alreadyInCart ? "Already In Cart" : "Add To Cart"}
          </button>

        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="mt-24 border-t pt-12">
        <h2 className="text-2xl font-semibold mb-6">
          Description
        </h2>
        <div
          className="prose max-w-none text-sm"
          dangerouslySetInnerHTML={{
            __html:
              product.excerpt?.rendered ||
              "<p>No description available.</p>",
          }}
        />
      </section>

      {/* DETAILS ACCORDION */}
      <section className="mt-12 border-t pt-8">
        <button
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="flex justify-between w-full text-xl font-medium"
        >
          Details
          <span>{detailsOpen ? "-" : "+"}</span>
        </button>

        {detailsOpen && (
          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <div
              className="prose max-w-none text-sm"
              dangerouslySetInnerHTML={{
                __html: product.content.rendered,
              }}
            />

          </div>
        )}
      </section>

    </main>
  );
}