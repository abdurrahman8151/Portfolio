/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow this development server to be opened through the LAN IP as well as localhost.
  // Next.js protects development-only assets/endpoints when the browser uses a different host.
  allowedDevOrigins: ['192.168.1.101'],
  images: {
    unoptimized: true,
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }]
  },
}

export default nextConfig
