"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function ProductDetailClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { addToCart, items } = useCart();

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("");
  const [selectedShape, setSelectedShape] = useState("");
  const [selectedCarat, setSelectedCarat] = useState("");
  const [ringSize, setRingSize] = useState("4");
  const sizes = [
    ...new Set(
      variants
        .filter(
          (v) =>
            v.style === selectedStyle &&
            v.shape === selectedShape &&
            v.metal === selectedMetal &&
            String(v.carat) === selectedCarat
        )
        .map((v) => String(v.size))
    ),
  ];
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

        const variantsRes = await fetch(
          `https://vandiams.com/cms/wp-json/wp/v2/product_variant?_embed&per_page=100`
        );

        if (variantsRes.ok) {
          const variantsData = await variantsRes.json();

          const filtered = variantsData
            .filter((v) => v.acf?.product == data.id)
            .map((v) => ({
              style: v.acf?.style || "",
              shape: v.acf?.shape || "",
              metal: v.acf?.metal || "",
              carat: String(v.acf?.carat || ""),
              size: String(v.acf?.size || ""),
              price: Number(v.acf?.price) || 0,
              stock:
                v.acf?.stock === true ||
                v.acf?.stock === 1 ||
                v.acf?.stock === "1",
              image:
                v._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
            }));

          setVariants(filtered);

          if (filtered.length > 0) {
            setSelectedStyle(filtered[0].style);
            setSelectedShape(filtered[0].shape);
            setSelectedMetal(filtered[0].metal);
            setSelectedCarat(String(filtered[0].carat));
            setRingSize(String(filtered[0].size));
          }
        }

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

  useEffect(() => {
    if (!sizes.includes(ringSize)) {
      setRingSize(sizes[0] || "");
    }
  }, [sizes]);

  /* =============================
     VARIANT OPTIONS
  ============================== */

  const styles = [...new Set(variants.map((v) => v.style))];
  const shapes = [...new Set(variants.map((v) => v.shape))];
  const metals = [...new Set(variants.map((v) => v.metal))];
  const carats = [...new Set(variants.map((v) => String(v.carat)))];

  /* =============================
     ACTIVE VARIANT
  ============================== */

  const activeVariant = useMemo(() => {
    return variants.find(
      (v) =>
        v.style === selectedStyle &&
        v.shape === selectedShape &&
        v.metal === selectedMetal &&
        String(v.carat) === selectedCarat &&
        String(v.size) === ringSize
    );
  }, [
    variants,
    selectedStyle,
    selectedShape,
    selectedMetal,
    selectedCarat,
    ringSize,
  ]);

  /* =============================
     DISPLAY DATA
  ============================== */

  const baseImage =
    product?._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/placeholder.jpg";

  const image = activeVariant?.image || baseImage;

  const basePrice = product?.acf?.price || 0;
  const price = activeVariant?.price ?? basePrice;

  const cleanTitle =
    product?.title?.rendered?.replace(/<[^>]+>/g, "") || "";

  const displayTitle = `${cleanTitle} - ${selectedStyle} - ${selectedShape} - ${selectedMetal.replace(
    "_",
    " "
  )} - ${selectedCarat}ct`;

  const alreadyInCart = items.some(
    (item) =>
      item.cartId ===
      `${product.id}-${selectedStyle}-${selectedShape}-${selectedMetal}-${selectedCarat}-${ringSize}`
  );

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

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      {/* BREADCRUMB */}
      <nav className="mb-10 text-sm text-gray-500">
        <Link href="/">Home</Link> /{" "}
        <Link href="/products">Products</Link> /{" "}
        <span className="text-black">{displayTitle}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* IMAGE */}
        <div className="bg-gray-100 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={displayTitle}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">

          <div>
            <h1 className="text-2xl sm:text-xl font-semibold leading-snug">
              {displayTitle}
            </h1>

            <p className="text-xl font-semibold mt-2">
              ${Number(price).toLocaleString()}
            </p>
          </div>

          {/* STYLE */}
          <div>
            <h3 className="font-medium mb-2">Style</h3>
            <div className="flex gap-4 flex-wrap">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-2 py-1 border ${selectedStyle === style
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
            <h3 className="font-medium mb-2">Metal</h3>
            <div className="flex gap-4 flex-wrap">
              {metals.map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`px-2 py-1 border text-sm ${selectedMetal === metal
                    ? "border-black"
                    : "border-gray-300"
                    }`}
                >
                  {metal.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* SHAPE */}
          <div>
            <h3 className="font-medium mb-2">Diamond Shape</h3>
            <div className="flex gap-4 flex-wrap">
              {shapes.map((shape) => (
                <button
                  key={shape}
                  onClick={() => setSelectedShape(shape)}
                  className={`px-2 py-1 border text-sm ${selectedShape === shape
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
            <h3 className="font-medium mb-2">Carat Weight</h3>
            <div className="flex gap-3 flex-wrap">
              {carats.map((carat) => (
                <button
                  key={carat}
                  onClick={() => setSelectedCarat(carat)}
                  className={`px-2 py-1 border ${selectedCarat === carat
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
            <h3 className="font-medium mb-2">Ring Size</h3>
            <select
              value={ringSize}
              onChange={(e) => setRingSize(e.target.value)}
              className="border px-2 py-1 w-48"
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* ADD TO CART */}
          <button
            disabled={alreadyInCart}
            onClick={() => {
              if (!ringSize) {
                alert("Please select a ring size");
                return;
              }

              addToCart({
                cartId: `${product.id}-${selectedStyle}-${selectedShape}-${selectedMetal}-${selectedCarat}-${ringSize}`,
                name: `${displayTitle} - Size ${ringSize}`,
                price: `€${Number(price).toLocaleString()}`,
                image,
                size: ringSize,
                style: selectedStyle,
                shape: selectedShape,
                metal: selectedMetal,
                carat: selectedCarat,
              });
            }}
            className={`w-full py-4 uppercase tracking-widest text-sm ${alreadyInCart
              ? "bg-gray-300 cursor-not-allowed"
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

      {/* DETAILS */}
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