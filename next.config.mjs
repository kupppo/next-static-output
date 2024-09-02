/** @type {import('next').NextConfig} */
const nextConfig = {}

if (process.env.STATIC_OUTPUT) {
  nextConfig.output = 'export'
}

export default nextConfig
