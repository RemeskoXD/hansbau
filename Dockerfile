# Multi-stage Dockerfile for Next.js 15 Standalone (Coolify / Self-Hosted VPS)
FROM node:22-alpine AS base

# Step 1: Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Step 2: Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# Step 3: Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Ensure data directory exists and has correct permissions for nextjs user
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data

# Copy static assets and standalone build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy initial seed data store
COPY --from=builder --chown=nextjs:nodejs /app/data ./data

# Expose volume for persistent NoSQL & CSV backup storage in Coolify
VOLUME ["/app/data"]

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
