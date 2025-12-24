FROM oven/bun:1.3.5

WORKDIR /app

COPY package.json tsconfig.json prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src

# Provide a non-sensitive build-time default so Prisma can generate.
# Runtime will override via Fly secrets.
ARG DATABASE_URL=postgres://placeholder:placeholder@localhost:5432/postgres
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production

# Install all deps so prisma is available to generate the client
RUN bun install
RUN bunx prisma generate

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "src/server.ts"]
