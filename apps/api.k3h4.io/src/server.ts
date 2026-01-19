import * as dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger, { type SwaggerOptions } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
import path from "node:path";
import { existsSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { registerAllRoutes } from "./routes";
import { scheduleDemCacheCleanup } from "./services/geo-dem-cache";

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

const swaggerTags: Record<string, { name: string; description: string }> = {
  health: { name: "Health", description: "Health and diagnostics" },
  auth: { name: "Auth", description: "Authentication and session" },
  profile: { name: "Profile", description: "User profiles" },
  bank: { name: "Bank", description: "Banking and balances" },
  persona: { name: "Persona", description: "Persona management" },
  assignment: { name: "Assignment", description: "Assignments and tasks" },
  staffing: { name: "Staffing", description: "Staffing cockpit and workforce planning" },
  freight: { name: "Freight", description: "Freight and routing" },
  warehouse: { name: "Warehouse", description: "Inventory and storage" },
  pos: { name: "POS", description: "Point of sale" },
  geo: { name: "Geo", description: "Geospatial caches and lookups" },
  maptiler: { name: "MapTiler", description: "MapTiler Cloud API proxy" },
  agriculture: { name: "Agriculture", description: "Agriculture simulator" },
  culinary: { name: "Culinary", description: "Culinary simulator" },
  arcade: { name: "Arcade", description: "Arcade simulator" },
  usda: { name: "USDA", description: "USDA data" },
  osrm: { name: "OSRM", description: "OSRM routing proxy" },
  telemetry: { name: "Telemetry", description: "Telemetry intake" },
};

const swaggerTagMap: Record<string, { name: string; description: string }> = {
  health: swaggerTags.health,
  auth: swaggerTags.auth,
  profile: swaggerTags.profile,
  bank: swaggerTags.bank,
  persona: swaggerTags.persona,
  personas: swaggerTags.persona, // plural route prefix
  assignment: swaggerTags.assignment,
  assignments: swaggerTags.assignment, // plural route prefix
  staffing: swaggerTags.staffing,
  freight: swaggerTags.freight,
  warehouse: swaggerTags.warehouse,
  pos: swaggerTags.pos,
  geo: swaggerTags.geo,
  maptiler: swaggerTags.maptiler,
  agriculture: swaggerTags.agriculture,
  culinary: swaggerTags.culinary,
  arcade: swaggerTags.arcade,
  usda: swaggerTags.usda,
  osrm: swaggerTags.osrm,
  telemetry: swaggerTags.telemetry,
};

const getSessionId = (request: FastifyRequest) => {
  const headerSession = request.headers["x-session-id"];
  if (typeof headerSession === "string" && headerSession.trim().length > 0) return headerSession.trim();
  if (Array.isArray(headerSession) && headerSession[0]) return headerSession[0].trim();
  return request.id;
};

const recordTelemetry = async (
  request: FastifyRequest,
  params: { eventType: string; source: string; payload?: unknown; sessionId?: string; path?: string; userId?: string },
) => {
  try {
    const sessionId = params.sessionId ?? getSessionId(request);
    const userId = params.userId ?? (request.user as { sub?: string } | undefined)?.sub;
    await prisma.telemetryEvent.create({
      data: {
        sessionId,
        userId,
        eventType: params.eventType,
        source: params.source,
        path: params.path ?? request.url,
        payload: params.payload ? (params.payload as any) : undefined,
      },
    });
  } catch (err) {
    request.log.warn({ err }, "telemetry insert failed");
  }
};

// Verbose request lifecycle logging
server.addHook("onRequest", async (request) => {
  request.requestStartTime = process.hrtime.bigint();
  request.log.info(
    {
      method: request.method,
      url: request.url,
      ip: request.ip,
      userAgent: request.headers["user-agent"],
    },
    "incoming request",
  );
});

server.addHook("onResponse", async (request, reply) => {
  const durationMs = request.requestStartTime
    ? Number((process.hrtime.bigint() - request.requestStartTime) / 1000000n)
    : undefined;

  request.log.info(
    {
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
      durationMs,
      contentLength: reply.getHeader("content-length"),
    },
    "response sent",
  );
});

server.addHook("onError", async (request, reply, error) => {
  request.log.error(
    {
      err: error,
      method: request.method,
      url: request.url,
      statusCode: reply.statusCode,
    },
    "request error",
  );
});

server.addHook("onRoute", (routeOptions) => {
  const existing = routeOptions.schema?.tags;
  if (existing && Array.isArray(existing) && existing.length > 0) return;

  const firstSegment = routeOptions.url?.split("/").filter(Boolean)[0];
  const mapped = firstSegment ? swaggerTagMap[firstSegment] : undefined;
  const fallback = firstSegment ?? "general";
  const tagName = mapped?.name ?? fallback;
  routeOptions.schema = { ...(routeOptions.schema ?? {}), tags: [tagName] };
});

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Prisma");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

// Periodic DEM cache cleanup (expired tiles + size cap)
const demCleanupHandle = scheduleDemCacheCleanup(prisma, server.log);

// Basic OpenAPI definition for the service
const openApiOptions: SwaggerOptions = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "K3H4 API",
      description:
        "API for K3H4 services. To authorize, sign in at https://www.k3h4.dev (or the dev frontend), open devtools > Application > Local Storage, and copy the value of k3h4.accessToken. Paste the token in Authorize; the UI will send it as a Bearer token automatically.",
      version: "0.1.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Paste your k3h4.accessToken; the UI prefixes Bearer for you.",
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: Object.values(swaggerTags),
  },
};

await server.register(fastifySwagger, openApiOptions);
const docsStaticDir = path.join(process.cwd(), "public", "docs", "static");
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

// Public telemetry intake; best-effort association with user/session
server.post("/telemetry", async (request, reply) => {
  const body = request.body as
    | {
        events?: Array<{ eventType?: string; source?: string; sessionId?: string; path?: string; payload?: unknown; userId?: string }>;
        eventType?: string;
        source?: string;
        sessionId?: string;
        path?: string;
        payload?: unknown;
        userId?: string;
      }
    | undefined;

  const incomingEvents = Array.isArray(body?.events)
    ? body?.events ?? []
    : [body].filter((val): val is NonNullable<typeof body> => Boolean(val));

  const normalizedEvents = incomingEvents
    .map((evt) => ({
      eventType: evt.eventType?.trim(),
      source: evt.source?.trim(),
      sessionId: evt.sessionId,
      path: evt.path,
      payload: evt.payload,
      userId: evt.userId,
    }))
    .filter((evt) => evt.eventType && evt.source) as Array<{
    eventType: string;
    source: string;
    sessionId?: string;
    path?: string;
    payload?: unknown;
    userId?: string;
  }>;

  if (normalizedEvents.length === 0) {
    return reply.status(400).send({ error: "eventType and source are required" });
  }

  // Optionally attach user if a valid token is present; do not fail intake on auth errors
  const hasAuth = typeof request.headers.authorization === "string" && request.headers.authorization.length > 0;
  if (hasAuth) {
    try {
      await request.jwtVerify();
    } catch (err) {
      request.log.debug({ err }, "telemetry token verification failed; continuing unauthenticated");
    }
  }

  await Promise.all(
    normalizedEvents.map((evt) =>
      recordTelemetry(request, {
        eventType: evt.eventType,
        source: evt.source,
        sessionId: evt.sessionId,
        path: evt.path,
        payload: evt.payload,
        userId: evt.userId,
      }),
    ),
  );

  return { ok: true, recorded: normalizedEvents.length };
});

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
