"use client";

import { useState } from "react";

export default function ProductCard({ product }) {
  const [selectedMetal, setSelectedMetal] = useState(product.metal);
  const [selectedShape, setSelectedShape] = useState(product.shape);
  const [selectedCarat, setSelectedCarat] = useState("1/2");
  const [hovered, setHovered] = useState(false);

  /* =============================
     IMAGE (FROM WORDPRESS API)
  ============================== */

  const currentImage = product.image;

  const shapes = ["Round", "Oval", "Cushion"];

  const metals = [
    "Platinum",
    "Yellow Gold",
    "Rose Gold",
    "White Gold",
    "Sterling Silver",
  ];

  const carats = ["1/2", "1", "1½", "2"];

  return (
    <div className="bg-white w-full text-xs sm:text-sm md:text-base">

      {/* TOP PICK */}
      <div className="text-[10px] sm:text-xs tracking-widest mb-2 sm:mb-4 text-gray-600">
        TOP PICK
      </div>

      {/* IMAGE */}
      <div
        className="aspect-square bg-gray-100 flex items-center justify-center mb-3 sm:mb-6 relative overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={currentImage || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-full object-contain transition-opacity duration-500"
        />
      </div>

      {/* TITLE */}
      <h3 className="text-sm sm:text-base md:text-lg mb-1 sm:mb-2 leading-tight">
        {product.name}
      </h3>

      {/* PRICE */}
      <p className="font-semibold text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
        £{product.price}
      </p>

      {/* SHAPE */}
      <div className="mb-3 sm:mb-4">
        <div className="text-[11px] sm:text-sm text-gray-500 mb-1 sm:mb-2">
          Shape
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {shapes.map((shape) => (
            <div
              key={shape}
              onClick={() => setSelectedShape(shape)}
              className={`w-5 h-5 sm:w-8 sm:h-8 border flex items-center justify-center cursor-pointer text-[10px] sm:text-xs transition
              ${
                selectedShape === shape
                  ? "border-black"
                  : "border-gray-300"
              }`}
            >
              {shape.charAt(0)}
            </div>
          ))}
        </div>
      </div>

      {/* METAL */}
      <div className="mb-3 sm:mb-4">
        <div className="text-[11px] sm:text-sm text-gray-500 mb-1 sm:mb-2">
          Metal
        </div>
        <div className="flex flex-wrap gap-2">
          {metals.map((metal) => (
            <div
              key={metal}
              onClick={() => setSelectedMetal(metal)}
              className={`px-1 sm:px-3 py-1 sm:py-2 border cursor-pointer text-[9px] sm:text-xs transition
              ${
                selectedMetal === metal
                  ? "border-black"
                  : "border-gray-300"
              }`}
            >
              {metal}
            </div>
          ))}
        </div>
      </div>

      {/* CARAT */}
      <div>
        <div className="text-[11px] sm:text-sm text-gray-500 mb-1 sm:mb-2">
          Carat
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {carats.map((c) => (
            <div
              key={c}
              onClick={() => setSelectedCarat(c)}
              className={`px-1 sm:px-4 py-1 sm:py-2 border cursor-pointer text-[10px] sm:text-sm transition
              ${
                selectedCarat === c
                  ? "border-black"
                  : "border-gray-300"
              }`}
            >
              {c}
            </div>
          ))}

          <span className="text-base sm:text-lg cursor-pointer">
            ›
          </span>
        </div>
      </div>
    </div>
  );
}