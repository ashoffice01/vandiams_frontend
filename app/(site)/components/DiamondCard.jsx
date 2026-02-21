export default function DiamondCard({
  carat,
  price,
  shape,
  color,
  clarity,
  cut,
}) {
  return (
    <div className="bg-white p-4 border hover:shadow-md transition">
      <div className="aspect-square bg-gray-200 mb-4" />

      <h3 className="font-medium text-sm mb-1">
        {carat} ct. {shape} Diamond
      </h3>

      <p className="text-sm font-semibold mb-2">
        ${price.toLocaleString()}
      </p>

      <p className="text-xs text-gray-500">
        Cut - {cut} &nbsp; Color - {color} &nbsp; Clarity - {clarity}
      </p>
    </div>
  );
}