#!/bin/sh
export NODE_ENV=prod.docker
pnpm install
pnpm run build
pnpm run start -p 80