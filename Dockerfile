ARG NODE_VERSION=21.5.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
COPY prisma ./prisma
COPY public ./public
COPY src ./src

COPY *.config.* .


RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi


# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

# Start Next.js in development mode based on the preferred package manager

CMD \
  if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn dev; \
  fi