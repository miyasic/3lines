/** @type {import('next').NextConfig} */
import { readFileSync } from 'fs';
import { join } from 'path';

// package.jsonのパスを指定
const packageJsonPath = join(process.cwd(), 'package.json');
// package.jsonを読み込む
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

const nextConfig = {
    env: {
        APP_VERSION: packageJson.version,
    },
};

export default nextConfig;
