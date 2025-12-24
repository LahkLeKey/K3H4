import * as dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

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

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for Prisma");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg(databaseUrl),
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

const hashPassword = (password: string): string => {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, 32);
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
};

const verifyPassword = (password: string, stored: string): boolean => {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const derived = scryptSync(password, Buffer.from(saltHex, "hex"), 32);
  return timingSafeEqual(derived, Buffer.from(hashHex, "hex"));
};

server.post("/auth/register", async (request, reply) => {
  const body = request.body as { email?: string; password?: string };
  if (!body?.email || !body?.password) {
    return reply.status(400).send({ error: "email and password are required" });
  }

  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) {
    return reply.status(409).send({ error: "user already exists" });
  }

  const passwordHash = hashPassword(body.password);
  const user = await prisma.user.create({
    data: { email: body.email, passwordHash },
  });

  const refreshToken = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30d
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt },
  });

  const accessToken = server.jwt.sign({ sub: user.id, email: user.email }, { expiresIn: "15m" });
  return { accessToken, refreshToken };
});

server.post("/auth/login", async (request, reply) => {
  const body = request.body as { email?: string; password?: string };
  if (!body?.email || !body?.password) {
    return reply.status(400).send({ error: "email and password are required" });
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } });
  if (!user || !verifyPassword(body.password, user.passwordHash)) {
    return reply.status(401).send({ error: "invalid credentials" });
  }

  const refreshToken = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt } });

  const accessToken = server.jwt.sign({ sub: user.id, email: user.email }, { expiresIn: "15m" });
  return { accessToken, refreshToken };
});

server.get(
  "/auth/me",
  {
    preHandler: [server.authenticate],
  },
  async (request) => {
    const userId = (request.user as { sub: string }).sub;
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true } });
    return { user };
  },
);

const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || "0.0.0.0";

try {
  await server.listen({ port, host });
  server.log.info(`Server running at http://${host}:${port}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
