export default function SuccessPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-24 text-center">
      <h1 className="font-serif text-4xl mb-6">
        Thank You for Your Purchase
      </h1>
      <p className="text-gray-600 mb-10">
        Your order has been successfully placed. Our team will begin processing it shortly.
      </p>
      <a
        href="/products"
        className="inline-block px-8 py-4 bg-black text-white text-sm tracking-widest uppercase"
      >
        Continue Shopping
      </a>
    </section>
  );
}
