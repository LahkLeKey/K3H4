import * as dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
import { existsSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { registerAllRoutes } from "./routes";
import { scheduleDemCacheCleanup } from "./services/geo-dem-cache";
import { registerCoreHooks } from "./server/hooks";
import { buildOpenApiOptions, docsStaticDir } from "./server/swagger";
import { createTelemetryRecorder, registerTelemetryRoutes } from "./server/telemetry";

dotenv.config();

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    user: {
      sub: string;
      email: string;
    };
    requestStartTime?: bigint;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string; email: string };
    user: { sub: string; email: string };
  }
}

const server = Fastify({
  logger: true,
});

await server.register(fastifyRateLimit, {
  // Higher overall limits for internal DB-backed routes; per-route limits will throttle external APIs.
  max: Number(process.env.RATE_LIMIT_MAX || 600),
  timeWindow: process.env.RATE_LIMIT_WINDOW || "1 minute",
  allowList: (request) => request.url?.startsWith("/telemetry") || false,
  errorResponseBuilder: () => ({ error: "Too many requests", code: 429, retryAfter: 60 }),
  addHeaders: {
    // keep defaults and ensure retry-after is present
    "x-ratelimit-limit": true,
    "x-ratelimit-remaining": true,
    "x-ratelimit-reset": true,
    "retry-after": true,
  },
});

registerCoreHooks(server);

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Prisma");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

// Periodic DEM cache cleanup (expired tiles + size cap)
const demCleanupHandle = scheduleDemCacheCleanup(prisma, server.log);

const resolveServerUrl = () => {
  const envUrl = process.env.PUBLIC_API_URL?.trim();
  if (envUrl) return envUrl;

  const port = process.env.PORT?.trim() || "3000";
  const host = process.env.HOST?.trim() && process.env.HOST !== "0.0.0.0" ? process.env.HOST.trim() : "localhost";
  return `http://${host}:${port}`;
};

// Build OpenAPI definition for the service
const openApiOptions = buildOpenApiOptions(resolveServerUrl);

await server.register(fastifySwagger, openApiOptions);
const swaggerUiOpts = {
  routePrefix: "/docs",
  uiHooks: {
    onRequest: async (request: FastifyRequest, reply: FastifyReply) => {
      const auth = request.headers.authorization;
      if (!auth) return; // allow read-only docs without a token
      try {
        await request.jwtVerify();
      } catch (err) {
        request.log.debug({ err }, "swagger ui auth failed");
        return reply.status(401).send({ error: "Unauthorized" });
      }
    },
  },
  transformStaticCSP: (header: string) => header, // keep defaults
  staticCSP: true,
  index: "index.html",
} as const;

if (existsSync(docsStaticDir)) {
  (swaggerUiOpts as any).baseDir = docsStaticDir;
} else {
  server.log.warn({ docsStaticDir }, "swagger ui static dir missing; using built-in assets");
}

await server.register(fastifySwaggerUi, swaggerUiOpts as any);
const corsOrigins = process.env.CORS_ORIGIN?.split(",") ?? ["http://localhost:5173", "http://localhost:4173", "https://www.k3h4.dev", "https://api.k3h4.dev"];

await server.register(fastifyCors, {
  origin: corsOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
    "X-CSRF-Token",
    "X-Session-Id",
  ],
  exposedHeaders: ["set-cookie"],
});
await server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "dev-secret-change-me",
});

server.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.status(401).send({ error: "Unauthorized" });
    }
  },
);

server.get("/health", async () => ({ status: "ok" }));

const recordTelemetry = createTelemetryRecorder(prisma);
registerTelemetryRoutes(server, prisma, recordTelemetry);

await registerAllRoutes(server, prisma, recordTelemetry);

server.addHook("onClose", async () => {
  clearInterval(demCleanupHandle);
});

const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || "0.0.0.0";

try {
  await server.listen({ port, host });
  server.log.info(`Server running at http://${host}:${port}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
