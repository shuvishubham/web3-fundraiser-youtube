/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["ipfs.infura.io", "th.bing.com"]
	}
};

module.exports = nextConfig;
