// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export",
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "randomuser.me",
      "cdn.jsdelivr.net",
      "vandiams.com",
    ],
  },
};

module.exports = nextConfig;
