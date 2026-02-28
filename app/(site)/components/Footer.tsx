import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative text-[#3a2f2a] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 scale-110 blur-lg"
        style={{
          background: "#efdaafc4",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f6f2ee]/70 via-[#f6f2ee]/80 to-[#f6f2ee]/90" />

      {/* Content */}
      <div className="relative">
        {/* Subscribe */}
        <div className="max-w-7xl mx-auto px-6 py-8 border-b border-black/10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="uppercase tracking-[0.25em] text-xs text-[#7a6a5f]">
              Subscribe
            </span>

            <div className="flex w-full sm:max-w-md">
              <input
                type="email"
                placeholder="Sign Me Up"
                className="flex-1 px-4 py-3 border border-[#d6cfc7] bg-white text-sm outline-none"
              />
              <button className="px-6 bg-[#3a2f2a] text-white text-sm">
                →
              </button>
            </div>
          </div>

          <div className="text-sm leading-relaxed text-[#6d5f55]">
            <p className="font-medium text-[#3a2f2a] mb-1">
              Get on the Guest List
            </p>
            <p>
              Perks include $100 off your first order* <br />
              Plus new launches, store openings, and more.
            </p>
          </div>
        </div>

        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-6 gap-12 text-sm">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo.png"
              alt="VANDIAMS"
              width={160}
              height={50}
              className="mb-6"
            />
            <p className="text-[#6d5f55] leading-relaxed">
              Creates modern diamond jewelry using responsible sourcing and intelligent design. Each piece is crafted to reflect individuality, elegance, and lasting value.
            </p>
          </div>

          {/* About Us */}
          <div>
            <h4 className="uppercase tracking-widest text-lg mb-5 text-[#7a6a5f]">
              About Us
            </h4>
            <ul className="space-y-3 text-[#6d5f55]">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="#">Sustainability Report</Link></li>
              <li><Link href="#">As Seen In</Link></li>
              <li><Link href="#">Reviews</Link></li>
              <li><Link href="#">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="uppercase tracking-widest text-lg mb-5 text-[#7a6a5f]">
              Contact
            </h4>
            <ul className="space-y-3 text-[#6d5f55]">
              <li>877-476-9627</li>
              <li><Link href="#">Affiliates</Link></li>
              <li><Link href="#">Email Us</Link></li>
              <li><Link href="#">Live Chat</Link></li>
              <li><Link href="/contact">Book an Appointment</Link></li>
              <li><Link href="#">Store Locator</Link></li>
              <li><Link href="#">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="uppercase tracking-widest text-lg mb-5 text-[#7a6a5f]">
              Support
            </h4>
            <ul className="space-y-3 text-[#6d5f55]">
              <li><Link href="#">Free Shipping</Link></li>
              <li><Link href="#">Free Returns</Link></li>
              <li><Link href="#">Warranty</Link></li>
              <li><Link href="#">Payment & Financing</Link></li>
              <li><Link href="#">Gift Card</Link></li>
              <li><Link href="#">Special Offers</Link></li>
              <li><Link href="#">GB Club</Link></li>
              <li><Link href="#">Track Your Order</Link></li>
              <li><Link href="#">Price Match Guarantee</Link></li>
              <li><Link href="#">GB | 365</Link></li>
              <li><Link href="#">Accessibility Statement</Link></li>
              <li><Link href="#">Support Center</Link></li>
            </ul>
          </div>

          {/* Education */}
          <div>
            <h4 className="uppercase tracking-widest text-lg mb-5 text-[#7a6a5f]">
              Education
            </h4>
            <ul className="space-y-3 text-[#6d5f55]">
              <li><Link href="#">Learn About the 4Cs</Link></li>
              <li><Link href="#">Learn About Diamond Shapes</Link></li>
              <li><Link href="#">Learn About Lab Grown Diamonds</Link></li>
              <li><Link href="#">Learn About Lab Grown Gemstones</Link></li>
              <li><Link href="#">How Lab Created Diamonds are Made</Link></li>
              <li><Link href="#">Lab-created Diamonds vs Mined Diamonds</Link></li>
              <li><Link href="#">Moissanite vs Lab Grown Diamonds</Link></li>
              <li><Link href="#">Mined Diamonds</Link></li>
              <li><Link href="#">Conflict-Free Diamonds</Link></li>
              <li><Link href="#">Lab Grown Diamond FAQs</Link></li>
            </ul>
          </div>

          {/* Jewelry Guide */}
          <div>
            <h4 className="uppercase tracking-widest text-lg mb-5 text-[#7a6a5f]">
              Jewelry Guide
            </h4>
            <ul className="space-y-3 text-[#6d5f55]">
              <li><Link href="#">Engagement Ring Styles</Link></li>
              <li><Link href="#">Find the Perfect Engagement Ring</Link></li>
              <li><Link href="#">Find the Perfect Wedding Band</Link></li>
              <li><Link href="#">Find the Right Metal</Link></li>
              <li><Link href="#">Find Your Ring Size</Link></li>
              <li><Link href="#">How To Videos</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-black/10 py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#7a6a5f]">
            <p>© {new Date().getFullYear()} VANDIAMS. All rights reserved.</p>

            <div className="flex gap-5">
              <Link
                href="#"
                aria-label="Instagram"
                className="hover:text-[#b59a6a] transition"
              >
                <FaInstagram size={16} />
              </Link>

              <Link
                href="#"
                aria-label="Pinterest"
                className="hover:text-[#b59a6a] transition"
              >
                <FaPinterestP size={16} />
              </Link>

              <Link
                href="#"
                aria-label="TikTok"
                className="hover:text-[#b59a6a] transition"
              >
                <FaTiktok size={16} />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="hover:text-[#b59a6a] transition"
              >
                <FaLinkedinIn size={16} />
              </Link>
            </div>


          </div>
        </div>
      </div>
    </footer>
  );
}
