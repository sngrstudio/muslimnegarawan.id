# base builder image
FROM oven/bun:1.1.8-debian AS base
WORKDIR /usr/src/app

FROM base AS deps
RUN mkdir -p /temp/install
COPY package.json bun.lockb /temp/install/
RUN cd /temp/install && bun install --frozen-lockfile

FROM base AS prod-deps
RUN mkdir -p /temp/install
COPY package.json bun.lockb /temp/install/
RUN cd /temp/install && bun install --frozen-lockfile --production

FROM base AS builder
COPY --from=deps /temp/install/node_modules node_modules
COPY . .
RUN bun run build

# Runner image
FROM oven/bun:1.1.8-alpine AS release

WORKDIR /usr/src/app
COPY --chown=bun:bun --from=prod-deps /temp/install/node_modules node_modules
COPY --chown=bun:bun --from=builder /usr/src/app/dist dist

USER bun
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["bun", "run", "./dist/server/entry.mjs"]