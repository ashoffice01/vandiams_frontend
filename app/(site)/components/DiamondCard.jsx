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
    <div className="bg-white p-4 border hover:shadow-md transition">

      {/* Image */}
      <div className="aspect-square bg-gray-200 mb-4 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${carat} ct ${shape} diamond`}
            className="w-full h-full object-cover"
          />
        ) : null}
      </div>

      {/* Title */}
      <h3 className="font-medium text-sm mb-1">
        {carat || "-"} ct. {shape || "Diamond"}
      </h3>

      {/* Price */}
      <p className="text-sm font-semibold mb-2">
        ${formattedPrice}
      </p>

      {/* Specs */}
      <p className="text-xs text-gray-500">
        Cut - {cut || "-"} &nbsp;
        Color - {color || "-"} &nbsp;
        Clarity - {clarity || "-"}
      </p>
    </div>
  );
}