FROM oven/bun:1.3.5

WORKDIR /app

COPY package.json tsconfig.json ./
COPY src ./src

ENV NODE_ENV=production
RUN bun install --production

ENV PORT=8080
EXPOSE 8080

CMD ["bun", "run", "src/server.ts"]
