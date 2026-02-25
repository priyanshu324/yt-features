import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  typescript:{
    ignoreBulidErors: true
  },
  eslint:{
    ignoreDuringBuilds: true
  }  
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
