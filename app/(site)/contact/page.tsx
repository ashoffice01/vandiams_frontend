"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  const form = e.currentTarget; // ✅ store reference immediately
  const formData = new FormData(form);

  setStatus("loading");

  const res = await fetch(
    "https://vandiams.com/cms/wp-json/custom/v1/contact",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      }),
    }
  );

  if (res.ok) {
    setStatus("success");
    form.reset(); // ✅ use stored reference
  } else {
    setStatus("error");
  }
}

  return (
    <section className="bg-neutral-50 py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-xl mb-20">
          <h1 className="font-serif text-4xl mb-6">Contact Us</h1>
          <p className="text-gray-600 leading-relaxed">
            We’re here to help you create something extraordinary.
            Reach out for consultations, custom designs, or support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 space-y-6 bg-white p-10 border border-black/10"
          >
            <div className="grid md:grid-cols-2 gap-6">
            <input type="text" name="company" style={{ display: "none" }} />
              <input
                name="name"
                required
                placeholder="Name"
                className="border border-black/20 px-4 py-3 text-sm outline-none"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="border border-black/20 px-4 py-3 text-sm outline-none"
              />
            </div>

            <input
              name="subject"
              required
              placeholder="Subject"
              className="border border-black/20 px-4 py-3 text-sm w-full outline-none"
            />

            <textarea
              name="message"
              required
              rows={6}
              placeholder="Your Message"
              className="border border-black/20 px-4 py-3 text-sm w-full outline-none resize-none"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#3a2f2a] text-white px-10 py-3 text-sm tracking-widest"
            >
              {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
            </button>

            {status === "success" && (
              <p className="text-green-600 text-sm mt-4">
                Thank you — your message has been sent successfully.
              </p>
            )}

            {status === "error" && (
              <p className="text-red-600 text-sm mt-4">
                Something went wrong. Please try again.
              </p>
            )}
          </form>

          {/* Info */}
          <div className="space-y-10 text-sm text-gray-600">
            <div>
              <h4 className="uppercase tracking-widest text-xs mb-3 text-gray-500">
                Phone
              </h4>
              <p>877-476-9627</p>
            </div>

            <div>
              <h4 className="uppercase tracking-widest text-xs mb-3 text-gray-500">
                Business Hours
              </h4>
              <p>
                Monday – Friday<br />
                10:00 AM – 6:00 PM EST
              </p>
            </div>

            <div>
              <h4 className="uppercase tracking-widest text-xs mb-3 text-gray-500">
                Live Chat
              </h4>
              <p className="italic text-gray-400">
                Live chat coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
