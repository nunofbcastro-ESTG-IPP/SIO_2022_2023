#!/bin/sh
export NODE_ENV=dev.docker
pnpm install
pnpm run dev -p 80
