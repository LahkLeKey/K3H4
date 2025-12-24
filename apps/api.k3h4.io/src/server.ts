import * as dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { randomBytes } from "node:crypto";
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

const createSessionTokens = async (userId: string, email?: string) => {
  const refreshToken = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId, expiresAt } });
  const accessToken = server.jwt.sign({ sub: userId, email }, { expiresIn: "15m" });
  return { accessToken, refreshToken, expiresAt };
};

// Local email/password auth removed; only OAuth flows are supported.

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

  const tokenData = (await tokenRes.json()) as { access_token?: string; error?: string; error_description?: string };
  if (!tokenRes.ok || !tokenData.access_token) {
    const isStaleCode = tokenData.error === "bad_verification_code";
    return reply.status(401).send({
      error: tokenData.error || "GitHub auth failed",
      detail: tokenData.error_description ?? null,
      staleCode: isStaleCode,
    });
  }

  const userRes = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/json",
      "User-Agent": "k3h4-api",
    },
  });
  const ghUser = (await userRes.json()) as { id?: number; login?: string; name?: string; avatar_url?: string; email?: string; message?: string };
  if (!userRes.ok || !ghUser.id) {
    return reply.status(401).send({ error: "Unable to fetch GitHub profile", detail: ghUser.message ?? null, status: userRes.status });
  }

  let primaryEmail = ghUser.email ?? null;
  if (!primaryEmail) {
    try {
      const emailRes = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: "application/json",
          "User-Agent": "k3h4-api",
        },
      });
      if (emailRes.ok) {
        const emails = (await emailRes.json()) as Array<{ email?: string; primary?: boolean; verified?: boolean }>;
        const primary = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.email);
        primaryEmail = primary?.email ?? null;
      } else {
        const errBody = (await emailRes.json().catch(() => ({}))) as { message?: string };
        return reply.status(401).send({ error: "Unable to fetch GitHub email", detail: errBody.message ?? null, status: emailRes.status });
      }
    } catch {
      // best-effort; ignore
    }
  }

  if (!primaryEmail) {
    return reply.status(401).send({ error: "GitHub email not available; ensure user:email scope and a verified email" });
  }

  const providerId = ghUser.id.toString();
  const user = await prisma.user.upsert({
    where: { provider_providerId: { provider: "github", providerId } },
    create: {
      provider: "github",
      providerId,
      email: primaryEmail,
      displayName: ghUser.name ?? ghUser.login ?? null,
      avatarUrl: ghUser.avatar_url ?? null,
    },
    update: {
      email: primaryEmail,
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
