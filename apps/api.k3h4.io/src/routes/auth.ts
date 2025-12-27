import { PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { randomBytes } from "node:crypto";
import { URLSearchParams } from "node:url";
import { type RecordTelemetryFn } from "./types";

const createSessionTokens = async (server: FastifyInstance, prisma: PrismaClient, userId: string, email?: string) => {
  const refreshToken = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId, expiresAt } });
  const accessToken = server.jwt.sign({ sub: userId, email }, { expiresIn: "15m" });
  return { accessToken, refreshToken, expiresAt };
};

export function registerAuthRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  // Local email/password auth removed; only OAuth flows are supported.
  server.post("/auth/github/callback", async (request, reply) => {
    try {
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
        await recordTelemetry(request, {
          eventType: "auth.github.callback.failed",
          source: "api",
          payload: { code: body.code, detail: tokenData.error_description ?? tokenData.error ?? null },
        });
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
        await recordTelemetry(request, {
          eventType: "auth.github.callback.failed",
          source: "api",
          payload: { code: body.code, detail: ghUser.message ?? null, status: userRes.status },
        });
        return reply
          .status(401)
          .send({ error: "Unable to fetch GitHub profile", detail: ghUser.message ?? null, status: userRes.status });
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
            return reply
              .status(401)
              .send({ error: "Unable to fetch GitHub email", detail: errBody.message ?? null, status: emailRes.status });
          }
        } catch (err) {
          request.log.warn({ err }, "github email fetch failed");
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

      await recordTelemetry(request, {
        eventType: "auth.github.callback.success",
        source: "api",
        payload: { providerId, email: user.email, redirectUri: body.redirectUri },
      });

      return createSessionTokens(server, prisma, user.id, user.email ?? undefined);
    } catch (err) {
      request.log.error({ err }, "github callback failed");
      await recordTelemetry(request, {
        eventType: "auth.github.callback.error",
        source: "api",
        payload: { message: err instanceof Error ? err.message : "unknown" },
      });
      return reply.status(500).send({ error: "GitHub auth failed" });
    }
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

    return createSessionTokens(server, prisma, user.id, user.email ?? undefined);
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
}
