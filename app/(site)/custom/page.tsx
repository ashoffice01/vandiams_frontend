"use client";

import { useState, DragEvent, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CustomDesignPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jewelryType, setJewelryType] = useState("Ring");
  const [occasion, setOccasion] = useState("");
  const [metal, setMetal] = useState("White Gold");
  const [budget, setBudget] = useState("$2,000 – $4,000");
  const [notes, setNotes] = useState("");

  // AI state
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  // submit state
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleFile = (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* AI suggestion */
  const generateDesign = async () => {
    setLoading(true);
    setAiSuggestion(null);

    try {
      const res = await fetch("/api/design-suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jewelryType,
          metal,
          budget,
          occasion,
          notes,
        }),
      });

      const data = await res.json();
      setAiSuggestion(data.suggestion);
    } catch {
      setAiSuggestion("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* Submit full request */
  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("jewelryType", jewelryType);
    formData.append("occasion", occasion);
    formData.append("metal", metal);
    formData.append("budget", budget);
    formData.append("notes", notes);
    if (file) formData.append("image", file);

    const res = await fetch("/api/custom-design", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setSubmitted(true);
    }

    setSubmitting(false);
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-serif text-4xl text-center mb-6">
        AI Custom Design
      </h1>

      <p className="text-center text-gray-600 mb-16">
        Share your vision. Our designers and AI work together to create
        something uniquely yours.
      </p>

      {submitted ? (
        <div className="border p-10 text-center bg-neutral-50">
          <h2 className="font-serif text-2xl mb-4">
            Request Received
          </h2>
          <p className="text-gray-600 mb-8">
            Thank you for sharing your vision. Our team will review your request
            and contact you shortly.
          </p>

          <Link
            href="/book-appointment"
            className="inline-block border border-black px-8 py-3 text-sm tracking-widest uppercase"
          >
            Book Consultation
          </Link>
        </div>
      ) : (
        <form className="space-y-10" onSubmit={submitRequest}>
          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              required
              placeholder="Name"
              className="border px-4 py-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="border px-4 py-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm uppercase tracking-widest mb-3">
              Upload Inspiration
            </label>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`border-2 border-dashed p-10 text-center transition
                ${dragging ? "border-black bg-neutral-50" : "border-gray-300"}
              `}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="upload"
                onChange={(e) =>
                  e.target.files && handleFile(e.target.files[0])
                }
              />

              {!preview ? (
                <label htmlFor="upload" className="text-sm text-gray-600 cursor-pointer">
                  Drag & drop an image here, or click to upload
                </label>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Image src={preview} alt="Preview" width={260} height={260} />
                  <button
                    type="button"
                    className="text-xs tracking-widest uppercase"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Jewelry Type */}
          <select className="w-full border px-4 py-3" value={jewelryType} onChange={(e) => setJewelryType(e.target.value)}>
            <option>Ring</option>
            <option>Necklace</option>
            <option>Bracelet</option>
            <option>Earrings</option>
          </select>

          {/* Occasion */}
          <input
            placeholder="Occasion (Engagement, Anniversary, Gift...)"
            className="w-full border px-4 py-3"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          />

          {/* Metal */}
          <select className="w-full border px-4 py-3" value={metal} onChange={(e) => setMetal(e.target.value)}>
            <option>White Gold</option>
            <option>Yellow Gold</option>
            <option>Rose Gold</option>
            <option>Platinum</option>
          </select>

          {/* Budget */}
          <select className="w-full border px-4 py-3" value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option>$1,000 – $2,000</option>
            <option>$2,000 – $4,000</option>
            <option>$4,000 – $6,000</option>
            <option>$6,000+</option>
          </select>

          {/* Notes */}
          <textarea
            rows={4}
            className="w-full border px-4 py-3"
            placeholder="Additional notes or preferences"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* AI Button */}
          <button
            type="button"
            onClick={generateDesign}
            className="w-full py-4 border border-black text-sm tracking-widest uppercase"
          >
            {loading ? "Designing with AI..." : "Generate AI Design Suggestion"}
          </button>

          {aiSuggestion && (
            <div className="border p-8 bg-neutral-50">
              <h3 className="font-serif text-2xl mb-4">AI Design Suggestion</h3>
              <p className="whitespace-pre-line text-gray-700">
                {aiSuggestion}
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-black text-white text-sm tracking-widest uppercase"
          >
            {submitting ? "Submitting..." : "Submit Design Request"}
          </button>

          {/* Optional CTA */}
          <p className="text-center text-sm text-gray-500">
            Prefer to talk it through?{" "}
            <Link href="/" className="underline">
              Book a consultation
            </Link>
          </p>
        </form>
      )}
    </section>
  );
}
