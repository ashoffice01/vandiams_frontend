"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function DiamondDetailsClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { addToCart, items } = useCart();

  const [diamond, setDiamond] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    async function fetchDiamond() {
      try {
        const res = await fetch(
          `https://vandiams.com/cms/wp-json/wp/v2/diamond/${id}?_embed`
        );

        if (!res.ok) {
          setDiamond(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setDiamond(data);

        const shape = data.acf?.shape?.[0] || "";
        const color = data.acf?.color?.[0] || "";
        const clarity = data.acf?.clarity?.[0] || "";
        const cut = data.acf?.cut?.[0] || "";

        const similarRes = await fetch(
          `https://vandiams.com/cms/wp-json/wp/v2/diamond?acf_format=standard&_embed&per_page=8`
        );

        if (similarRes.ok) {
          const similarData = await similarRes.json();

          const filtered = similarData
            .filter((item) => item.id !== data.id)
            .filter((item) => {
              return (
                item.acf?.shape?.[0] === shape ||
                item.acf?.color?.[0] === color ||
                item.acf?.clarity?.[0] === clarity ||
                item.acf?.cut?.[0] === cut
              );
            })
            .slice(0, 4);

          setSimilar(filtered);
        }
      } catch (err) {
        console.error(err);
        setDiamond(null);
      } finally {
        setLoading(false);
      }
    }

    fetchDiamond();
  }, [id]);

  if (!id) return <div className="p-10">No diamond selected.</div>;
  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="bg-gray-200 aspect-square rounded-xl" />

          <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-12 bg-gray-200 rounded w-full mt-6" />
            <div className="space-y-3 mt-8">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>

        </div>
      </main>
    );
  }
  if (!diamond) return <div className="p-10">Diamond not found.</div>;

  const image =
    diamond._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/placeholder.jpg";

  const carat = diamond.acf?.carat || "";
  const shape = diamond.acf?.shape?.[0] || "";
  const color = diamond.acf?.color?.[0] || "";
  const clarity = diamond.acf?.clarity?.[0] || "";
  const cut = diamond.acf?.cut?.[0] || "";
  const price = diamond.acf?.price || 0;
  const report = diamond.acf?.report?.[0] || "";

  const cleanTitle = diamond.title.rendered.replace(/<[^>]+>/g, "");

  const alreadyInCart = items.some(
    (item) => item.name === cleanTitle
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://vandiams.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Diamonds",
        item: "https://vandiams.com/diamonds",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cleanTitle,
        item: `https://vandiams.com/diamond/detail/?id=${id}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-black">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/diamonds" className="hover:text-black">
                Diamonds
              </Link>
            </li>
            <li>/</li>
            <li className="text-black font-medium truncate max-w-[200px]">
              {cleanTitle}
            </li>
          </ol>
        </nav>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image */}
          <div className="bg-gray-100 aspect-square overflow-hidden rounded-xl">
            <img
              src={image}
              alt={cleanTitle}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">

            <div>
              <h1
                className="text-xl sm:text-2xl font-semibold leading-snug"
                dangerouslySetInnerHTML={{ __html: diamond.title.rendered }}
              />
              <p className="text-sm text-gray-500 mt-2">
                {cut} Cut | {color} Color | {clarity} Clarity
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold">
                £{Number(price).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {report.toUpperCase()} Certified Lab Grown Diamond
              </p>
            </div>

            {/* Add to Cart */}
            <button
              disabled={alreadyInCart}
              onClick={() =>
                addToCart({
                  cartId: `${diamond.id}-${Date.now()}`,
                  name: cleanTitle,
                  price: `£${Number(price).toLocaleString()}`,
                  image: image,
                })
              }
              className={`w-full py-4 uppercase tracking-widest text-sm transition ${alreadyInCart
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
                }`}
            >
              {alreadyInCart ? "Already In Cart" : "Add To Cart"}
            </button>

            {/* Specs */}
            <div className="border rounded-lg divide-y text-sm mt-6">
              <div className="flex justify-between p-3">
                <span>Carat</span>
                <span>{carat} Ct</span>
              </div>
              <div className="flex justify-between p-3">
                <span>Shape</span>
                <span>{shape}</span>
              </div>
              <div className="flex justify-between p-3">
                <span>Color</span>
                <span>{color}</span>
              </div>
              <div className="flex justify-between p-3">
                <span>Clarity</span>
                <span>{clarity}</span>
              </div>
              <div className="flex justify-between p-3">
                <span>Cut</span>
                <span>{cut}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Description */}
        <section className="mt-20 border-t pt-10">
          <h2 className="text-2xl font-semibold mb-6">
            Description
          </h2>
          <div
            className="prose max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: diamond.content.rendered }}
          />
        </section>

        {/* Similar Diamonds */}
        {similar.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-semibold mb-8">
              Similar Diamonds
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map((item) => {
                const image =
                  item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "/placeholder.jpg";

                const price = item.acf?.price || 0;
                const clean = item.title.rendered.replace(/<[^>]+>/g, "");

                return (
                  <Link
                    key={item.id}
                    href={`/diamonds/detail/?id=${item.id}`}
                    className="border rounded-xl overflow-hidden hover:shadow-md transition"
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={image}
                        alt={clean}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4 space-y-2">
                      <h3
                        className="text-sm font-medium line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: item.title.rendered,
                        }}
                      />
                      <p className="font-semibold">
                        £{Number(price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

      </main>
    </>
  );
}