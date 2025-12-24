FROM oven/bun:1.3.5

WORKDIR /app

COPY package.json tsconfig.json prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ENV NODE_ENV=production

# Install all deps so prisma is available to generate the client
RUN bun install
RUN bunx prisma generate
RUN bunx prisma migrate deploy

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "src/server.ts"]
