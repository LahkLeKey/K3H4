import * as dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { registerAuthRoutes } from "./routes/auth";
import { registerBankRoutes } from "./routes/bank";
import { registerProfileRoutes } from "./routes/profile";

dotenv.config();

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    user?: {
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

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Prisma");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

// Basic OpenAPI definition for the service
const openApiOptions = {
  swagger: {
    info: {
      title: "K3H4 API",
      description: "API for K3H4 services",
      version: "0.1.0",
    },
    tags: [
      {
        name: "health",
        description: "Health and diagnostics",
      },
    ],
  },
};

await server.register(fastifySwagger, openApiOptions);
await server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});
await server.register(fastifyCors, {
  origin: process.env.CORS_ORIGIN?.split(",") ?? ["*"],
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

registerAuthRoutes(server, prisma, recordTelemetry);
registerProfileRoutes(server, prisma, recordTelemetry);
registerBankRoutes(server, prisma, recordTelemetry);

const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || "0.0.0.0";

try {
  await server.listen({ port, host });
  server.log.info(`Server running at http://${host}:${port}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
