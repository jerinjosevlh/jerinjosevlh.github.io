import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Static HTML in out/, published by GitHub Pages (.github/workflows/pages.yml).
    // Trailing slashes emit work/x/index.html, which any static host can serve.
    output: 'export',
    trailingSlash: true,
};

export default nextConfig;
