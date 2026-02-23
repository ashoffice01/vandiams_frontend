export default function DiamondCard({
  id,
  carat,
  price,
  shape,
  color,
  clarity,
  cut,
  image,
}) {
  const formattedPrice = Number(price || 0).toLocaleString();

  return (
    <div className="bg-white p-4 border rounded-lg hover:shadow-lg transition duration-300">

      {/* Image */}
      <div className="aspect-square bg-gray-100 mb-4 overflow-hidden flex items-center justify-center rounded-md">
        {image ? (
          <img
            src={image}
            alt={`${carat} ct ${shape} diamond`}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        ) : (
          <span className="text-xs text-gray-400">
            No Image Available
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-medium text-sm sm:text-base mb-1">
        {carat || "-"} ct. {shape || "Diamond"}
      </h3>

      {/* Price */}
      <p className="text-base sm:text-lg font-semibold mb-2">
        ${formattedPrice}
      </p>

      {/* Specs */}
      <div className="text-xs sm:text-sm text-gray-500 space-y-1">
        <div>Cut: {cut || "-"}</div>
        <div>Color: {color || "-"}</div>
        <div>Clarity: {clarity || "-"}</div>
      </div>
    </div>
  );
}