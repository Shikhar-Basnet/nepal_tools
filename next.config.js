const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,

  // IMPORTANT: disable RSC behavior
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig