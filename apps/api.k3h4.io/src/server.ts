import * as dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { URLSearchParams } from "node:url";

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

const createSessionTokens = async (userId: string, email?: string) => {
  const refreshToken = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId, expiresAt } });
  const accessToken = server.jwt.sign({ sub: userId, email }, { expiresIn: "15m" });
  return { accessToken, refreshToken, expiresAt };
};

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
    data: { email: body.email, passwordHash, provider: "local", providerId: body.email },
  });
  return createSessionTokens(user.id, user.email ?? undefined);
});

server.post("/auth/login", async (request, reply) => {
  const body = request.body as { email?: string; password?: string };
  if (!body?.email || !body?.password) {
    return reply.status(400).send({ error: "email and password are required" });
  }

  const user = await prisma.user.findFirst({ where: { provider: "local", email: body.email } });
  if (!user || !user.passwordHash || !verifyPassword(body.password, user.passwordHash)) {
    return reply.status(401).send({ error: "invalid credentials" });
  }

  return createSessionTokens(user.id, user.email ?? undefined);
});

server.post("/auth/github/callback", async (request, reply) => {
  const body = request.body as { code?: string; redirectUri?: string };
  if (!body?.code || !body?.redirectUri) {
    return reply.status(400).send({ error: "code and redirectUri are required" });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return reply.status(500).send({ error: "GitHub OAuth not configured" });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code: body.code,
      redirect_uri: body.redirectUri,
    }),
  });

  const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };
  if (!tokenRes.ok || !tokenData.access_token) {
    return reply.status(401).send({ error: tokenData.error || "GitHub auth failed" });
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: "application/json" },
  });
  const ghUser = (await userRes.json()) as { id?: number; login?: string; name?: string; avatar_url?: string; email?: string };
  if (!userRes.ok || !ghUser.id) {
    return reply.status(401).send({ error: "Unable to fetch GitHub profile" });
  }

  const providerId = ghUser.id.toString();
  const user = await prisma.user.upsert({
    where: { provider_providerId: { provider: "github", providerId } },
    create: {
      provider: "github",
      providerId,
      email: ghUser.email ?? null,
      displayName: ghUser.name ?? ghUser.login ?? null,
      avatarUrl: ghUser.avatar_url ?? null,
    },
    update: {
      email: ghUser.email ?? null,
      displayName: ghUser.name ?? ghUser.login ?? null,
      avatarUrl: ghUser.avatar_url ?? null,
    },
  });

  return createSessionTokens(user.id, user.email ?? undefined);
});

server.post("/auth/github/url", async (request, reply) => {
  const body = request.body as { redirectUri?: string };
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return reply.status(500).send({ error: "GitHub OAuth not configured" });
  }
  const redirectUri = body?.redirectUri;
  if (!redirectUri) {
    return reply.status(400).send({ error: "redirectUri is required" });
  }
  const authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user%20user:email`;
  return { authorizeUrl };
});

server.post("/auth/linkedin/callback", async (request, reply) => {
  const body = request.body as { code?: string; redirectUri?: string };
  if (!body?.code || !body?.redirectUri) {
    return reply.status(400).send({ error: "code and redirectUri are required" });
  }

  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return reply.status(500).send({ error: "LinkedIn OAuth not configured" });
  }

  const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: body.code,
      redirect_uri: body.redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string };
  if (!tokenRes.ok || !tokenData.access_token) {
    return reply.status(401).send({ error: tokenData.error || "LinkedIn auth failed" });
  }

  const profileRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const profile = (await profileRes.json()) as { sub?: string; name?: string; email?: string; picture?: string };
  if (!profileRes.ok || !profile.sub) {
    return reply.status(401).send({ error: "Unable to fetch LinkedIn profile" });
  }

  const providerId = profile.sub;
  const user = await prisma.user.upsert({
    where: { provider_providerId: { provider: "linkedin", providerId } },
    create: {
      provider: "linkedin",
      providerId,
      email: profile.email ?? null,
      displayName: profile.name ?? null,
      avatarUrl: profile.picture ?? null,
    },
    update: {
      email: profile.email ?? null,
      displayName: profile.name ?? null,
      avatarUrl: profile.picture ?? null,
    },
  });

  return createSessionTokens(user.id, user.email ?? undefined);
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
