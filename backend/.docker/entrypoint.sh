#!/bin/sh
export NODE_ENV=dev.docker
pnpm install
pnpm run start:dev
