/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
//segue abaixo um exemplo de como fazer redirect direto pelo next.config.js
  async redirects(){
    return [
      {
        source: "/portfolio/card",
        destination: "/portfolio?category=card",
        permanent: true,
      },
      {
        source: "/portfolio/logo",
        destination: "/portfolio?category=logo",
        permanent: true,
      },
      {
        source: "/portfolio/web",
        destination: "/portfolio?category=web",
        permanent: true,
      },
      {
        source: "/portfolio/uiux",
        destination: "/portfolio?category=uiux",
        permanent: true,
      },
      {
        source: "/portfolio/printing",
        destination: "/portfolio?category=printing",
        permanent: true,
      },
      {
        source: "/portfolio/retouching",
        destination: "/portfolio?category=retouching",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
