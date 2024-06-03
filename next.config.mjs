/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
      domains: ['apod.nasa.gov', 'img.youtube.com']
    }
};

export default nextConfig;
