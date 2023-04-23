/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
//segue abaixo um exemplo de como fazer redirect direto pelo next.config.js
/*   async redirects(){
    return [
      {
        source: "/portfolio/card",
        destination: "/portfolio?category=card",
        permanent: true,
      },
    ]
  }, */
}

module.exports = nextConfig
