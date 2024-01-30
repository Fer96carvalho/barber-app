/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'https://utfs.io/**'
                
            }
        ]
    }
};

export default nextConfig;
