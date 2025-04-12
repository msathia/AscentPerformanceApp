import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['https://3002-idx-studio-1744303312524.cluster-joak5ukfbnbyqspg4tewa33d24.cloudworkstations.dev'],
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: { 
    
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
