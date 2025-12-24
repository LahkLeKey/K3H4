FROM oven/bun:1.3.5

WORKDIR /app

COPY package.json tsconfig.json prisma.config.ts ./
COPY prisma ./prisma
COPY src ./src

ARG DATABASE_URL
ARG JWT_SECRET=change-me
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV NODE_ENV=production

# Install all deps so prisma is available to generate the client
RUN bun install
RUN bunx prisma generate

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "src/server.ts"]
