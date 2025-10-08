/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permitir imágenes en base64 y desde via.placeholder.com
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    // También permitimos data URLs (para las base64 de MongoDB)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
