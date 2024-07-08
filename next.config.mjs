/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'shorturl.at',
            }
        ]
    }
};

export default nextConfig;
