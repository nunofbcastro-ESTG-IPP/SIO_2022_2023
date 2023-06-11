/** @type {import('next').NextConfig} */
const path = require('path');
const Dotenv = require('dotenv-webpack');

function getEnvFile() {
  const envsFiles = ['dev.local', 'dev.docker', 'prod.docker'];

  let envFile = process.env.NODE_ENV;

  if (!envsFiles.includes(envFile)) {
    envFile = 'dev.local';
  }

  return `.env.${envFile}`;
}

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.plugins.push(
      new Dotenv({ path: path.resolve(__dirname, getEnvFile()) })
    );
    return config;
  },
};

module.exports = nextConfig;
