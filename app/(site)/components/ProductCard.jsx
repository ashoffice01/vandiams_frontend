"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

export default function ProductCard({
  id,
  name,
  price,
  image,
  stock,
  variants = [],
}) {

  /* =============================
     BUILD OPTIONS FROM VARIANTS
  ============================== */

  const shapes = [...new Set(variants.map(v => v.shape))];
  const metals = [...new Set(variants.map(v => v.metal))];
  const carats = [...new Set(variants.map(v => String(v.carat)))];

  /* =============================
     DEFAULT SELECTION
  ============================== */

  const [selectedShape, setSelectedShape] = useState(shapes[0] || "");
  const [selectedMetal, setSelectedMetal] = useState(metals[0] || "");
  const [selectedCarat, setSelectedCarat] = useState(carats[0] || "");

  /* =============================
     FIND ACTIVE VARIANT
  ============================== */

  const activeVariant = useMemo(() => {
    return variants.find(
      v =>
        v.shape === selectedShape &&
        v.metal === selectedMetal &&
        String(v.carat) === selectedCarat
    );
  }, [variants, selectedShape, selectedMetal, selectedCarat]);

  const displayPrice = activeVariant?.price ?? price;

  const displayImage =
    activeVariant?.image ||
    image ||
    "/placeholder.jpg";

  const displayTitle = `${name} - ${selectedShape} - ${selectedMetal.replace("_", " ")} - ${selectedCarat}`;
  const inStock = activeVariant?.stock ?? stock;

  /* =============================
     VALID OPTION CHECK
  ============================== */

  const isShapeAvailable = (shape) =>
    variants.some(
      v =>
        v.shape === shape &&
        v.metal === selectedMetal
    );

  const isMetalAvailable = (metal) =>
    variants.some(
      v =>
        v.shape === selectedShape &&
        v.metal === metal
    );

  const isCaratAvailable = (carat) =>
    variants.some(
      v =>
        v.shape === selectedShape &&
        v.metal === selectedMetal &&
        String(v.carat) === carat
    );


  useEffect(() => {

    const validCarats = variants
      .filter(
        v =>
          v.shape === selectedShape &&
          v.metal === selectedMetal
      )
      .map(v => String(v.carat));

    if (!validCarats.includes(selectedCarat)) {
      setSelectedCarat(validCarats[0] || "");
    }

  }, [selectedShape, selectedMetal, variants]);

  return (
    <div className="bg-white w-full text-xs sm:text-sm md:text-base">

      {/* TOP PICK */}
      <div className="text-[10px] sm:text-xs tracking-widest mb-2 sm:mb-4 text-gray-600">
        TOP PICK
      </div>

      {/* IMAGE */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center mb-3 sm:mb-6 relative overflow-hidden">
        <Link href={`/products/detail?id=${id}`}>
          <img
            src={displayImage || "/placeholder.jpg"}
            alt={name}
            className="w-full h-full object-contain transition-opacity duration-500"
          />
        </Link>
      </div>

      {/* TITLE */}
      <h3 className="text-sm sm:text-base md:text-sm mb-1 sm:mb-1 leading-tight">
        {displayTitle}
      </h3>

      {/* PRICE */}
      <p className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-2">
        ${displayPrice}
      </p>

      {/* SHAPE */}
      <div className="mb-2 sm:mb-2">
        <div className="text-[11px] sm:text-sm text-gray-500 mb-1 sm:mb-1">
          Shape
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {shapes.map((s) => {

            const disabled = !isShapeAvailable(s);

            return (
              <div
                key={s}
                onClick={() => !disabled && setSelectedShape(s)}
                className={`w-5 h-3 sm:w-5 sm:h-5 border flex items-center justify-center cursor-pointer text-[10px] sm:text-xs transition
                ${selectedShape === s ? "border-black" : "border-gray-300"}
                ${disabled ? "opacity-30 cursor-not-allowed" : ""}
                `}
              >
                {s.charAt(0).toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>

      {/* METAL */}
      <div className="mb-2 sm:mb-2">
        <div className="text-[11px] sm:text-sm text-gray-500 mb-1 sm:mb-1">
          Metal
        </div>

        <div className="flex flex-wrap gap-2">
          {metals.map((m) => {

            const disabled = !isMetalAvailable(m);

            return (
              <div
                key={m}
                onClick={() => !disabled && setSelectedMetal(m)}
                className={`px-1 sm:px-3 py-1 sm:py-1 border cursor-pointer text-[9px] sm:text-xs transition
                ${selectedMetal === m ? "border-black" : "border-gray-300"}
                ${disabled ? "opacity-30 cursor-not-allowed" : ""}
                `}
              >
                {m.replace("_", " ")}
              </div>
            );
          })}
        </div>
      </div>

      {/* CARAT */}
      <div>
        <div className="text-[11px] sm:text-sm text-gray-500 mb-1 sm:mb-1">
          Carat
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {carats.map((c) => {

            const disabled = !isCaratAvailable(c);

            return (
              <div
                key={c}
                onClick={() => !disabled && setSelectedCarat(c)}
                className={`px-1 sm:px-4 py-1 sm:py-1 border cursor-pointer text-[10px] sm:text-sm transition
                ${selectedCarat === c ? "border-black" : "border-gray-300"}
                ${disabled ? "opacity-30 cursor-not-allowed" : ""}
                `}
              >
                {c}
              </div>
            );
          })}

          <span className="text-base sm:text-lg cursor-pointer">›</span>
        </div>
      </div>

      {!inStock && (
        <div className="text-red-500 text-xs mt-2">
          Out of stock
        </div>
      )}
    </div>
  );
}