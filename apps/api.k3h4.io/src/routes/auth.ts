import { Prisma, PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { randomBytes } from "node:crypto";
import { URLSearchParams } from "node:url";
import { buildTelemetryBase } from "./telemetry";
import { type RecordTelemetryFn } from "./types";

const ACCOUNT_DELETE_PHRASE = "Delete-My-K3H4-Data";
const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;

type DeleteJobStatus = {
  userId: string;
  status: "queued" | "running" | "done" | "error";
  progress: number;
  message?: string;
  counts?: Record<string, unknown>;
  updatedAt: number;
};

const deletionJobs = new Map<string, DeleteJobStatus>();
const linkedinStates = new Map<string, number>();

const createState = (map: Map<string, number>) => {
  const state = randomBytes(12).toString("hex");
  map.set(state, Date.now());
  return state;
};

const validateState = (map: Map<string, number>, state?: string) => {
  if (!state) return false;
  const ts = map.get(state);
  if (!ts) return false;
  if (Date.now() - ts > OAUTH_STATE_TTL_MS) {
    map.delete(state);
    return false;
  }
  map.delete(state);
  return true;
};

const createSessionTokens = async (server: FastifyInstance, prisma: PrismaClient, userId: string, email?: string) => {
  const refreshToken = randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  await prisma.refreshToken.create({ data: { token: refreshToken, userId, expiresAt } });
  const accessToken = server.jwt.sign({ sub: userId, email: email ?? "" }, { expiresIn: "15m" });
  return { accessToken, refreshToken, expiresAt };
};

const runDeleteJob = async (prisma: PrismaClient, jobId: string, userId: string, recordTelemetry: RecordTelemetryFn, request: any) => {
  const updateStatus = (partial: Partial<DeleteJobStatus>) => {
    const current = deletionJobs.get(jobId);
    if (!current) return;
    const next = { ...current, ...partial, updatedAt: Date.now() } as DeleteJobStatus;
    deletionJobs.set(jobId, next);
  };

  try {
    updateStatus({ status: "running", progress: 10, message: "Starting deletion" });

    const steps: Array<{ key: string; action: () => Promise<unknown> }> = [
      { key: "telemetry", action: () => prisma.telemetryEvent.deleteMany({ where: { userId } }) },
      { key: "bankTransactions", action: () => prisma.bankTransaction.deleteMany({ where: { userId } }) },
      { key: "personas", action: () => prisma.persona.deleteMany({ where: { userId } }) },
      { key: "staffingPlacements", action: () => prisma.staffingPlacement.deleteMany({ where: { userId } }) },
      { key: "staffingShifts", action: () => prisma.staffingShift.deleteMany({ where: { userId } }) },
      { key: "staffingCandidates", action: () => prisma.staffingCandidate.deleteMany({ where: { userId } }) },
      { key: "staffingRoles", action: () => prisma.staffingRole.deleteMany({ where: { userId } }) },
      { key: "staffingEngagements", action: () => prisma.staffingEngagement.deleteMany({ where: { userId } }) },
      { key: "assignmentTimecards", action: () => prisma.assignmentTimecard.deleteMany({ where: { assignment: { userId } } }) },
      { key: "assignmentPayouts", action: () => prisma.assignmentPayout.deleteMany({ where: { persona: { userId } } }) },
      { key: "assignments", action: () => prisma.assignment.deleteMany({ where: { userId } }) },
      { key: "freightLoads", action: () => prisma.freightLoad.deleteMany({ where: { userId } }) },
      { key: "warehouseItems", action: () => prisma.warehouseItem.deleteMany({ where: { userId } }) },
      { key: "posLineItems", action: () => prisma.posLineItem.deleteMany({ where: { ticket: { userId } } }) },
      { key: "posTickets", action: () => prisma.posTicket.deleteMany({ where: { userId } }) },
      { key: "posStores", action: () => prisma.posStore.deleteMany({ where: { userId } }) },
      { key: "agricultureShipments", action: () => prisma.agricultureShipment.deleteMany({ where: { userId } }) },
      { key: "agricultureTasks", action: () => prisma.agricultureTask.deleteMany({ where: { userId } }) },
      { key: "agriculturePlots", action: () => prisma.agriculturePlot.deleteMany({ where: { userId } }) },
      { key: "culinaryPrepTasks", action: () => prisma.culinaryPrepTask.deleteMany({ where: { userId } }) },
      { key: "culinarySupplierNeeds", action: () => prisma.culinarySupplierNeed.deleteMany({ where: { userId } }) },
      { key: "culinaryMenuItems", action: () => prisma.culinaryMenuItem.deleteMany({ where: { userId } }) },
      { key: "arcadeSessions", action: () => prisma.arcadeSession.deleteMany({ where: { userId } }) },
      { key: "arcadeRedemptions", action: () => prisma.arcadeRedemption.deleteMany({ where: { userId } }) },
      { key: "arcadePrizes", action: () => prisma.arcadePrize.deleteMany({ where: { userId } }) },
      { key: "arcadeTopUps", action: () => prisma.arcadeTopUp.deleteMany({ where: { userId } }) },
      { key: "arcadeCards", action: () => prisma.arcadeCard.deleteMany({ where: { userId } }) },
      { key: "arcadeMachines", action: () => prisma.arcadeMachine.deleteMany({ where: { userId } }) },
      { key: "userPreferences", action: () => prisma.userPreference.deleteMany({ where: { userId } }) },
      { key: "refreshTokens", action: () => prisma.refreshToken.deleteMany({ where: { userId } }) },
      { key: "user", action: () => prisma.user.delete({ where: { id: userId } }) },
    ];

    const counts: Record<string, unknown> = {};

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const result = await step.action();
      counts[step.key] = result;
      const progress = Math.min(95, Math.round(((i + 1) / steps.length) * 100));
      updateStatus({ progress, message: `Deleting ${step.key}` });
    }

    updateStatus({ status: "done", progress: 100, message: "Deletion complete", counts });

    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "auth.delete.completed",
      source: "api",
      payload: { userId, counts },
    });
  } catch (err) {
    updateStatus({ status: "error", progress: 100, message: err instanceof Error ? err.message : "unknown" });
    await recordTelemetry(request, {
      ...buildTelemetryBase(request),
      eventType: "auth.delete.error",
      source: "api",
      payload: { message: err instanceof Error ? err.message : "unknown" },
    });
  }
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
          ...buildTelemetryBase(request),
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
          ...buildTelemetryBase(request),
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
          k3h4CoinBalance: new Prisma.Decimal("25000"),
        },
        update: {
          email: primaryEmail,
          displayName: ghUser.name ?? ghUser.login ?? null,
          avatarUrl: ghUser.avatar_url ?? null,
        },
      });

      // Persist provider grant so we can revoke on signout
      try {
        await (prisma as any).providerGrant.upsert({
          where: { provider_providerId: { provider: "github", providerId } },
          create: {
            userId: user.id,
            provider: "github",
            providerId,
            accessToken: tokenData.access_token ?? "",
            scope: (tokenData as any).scope ?? null,
          },
          update: {
            accessToken: tokenData.access_token ?? "",
            scope: (tokenData as any).scope ?? null,
          },
        });
      } catch (err) {
        request.log.warn({ err }, "persisting github grant failed");
      }

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "auth.github.callback.success",
        source: "api",
        payload: { providerId, email: user.email, redirectUri: body.redirectUri },
      });

      return createSessionTokens(server, prisma, user.id, user.email ?? undefined);
    } catch (err) {
      request.log.error({ err }, "github callback failed");
      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
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
    const authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=read:user%20user:email&prompt=login`;
    return { authorizeUrl };
  });

  server.post("/auth/linkedin/url", async (request, reply) => {
    const body = request.body as { redirectUri?: string };
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    if (!clientId) {
      return reply.status(500).send({ error: "LinkedIn OAuth not configured" });
    }
    const redirectUri = body?.redirectUri;
    if (!redirectUri) {
      return reply.status(400).send({ error: "redirectUri is required" });
    }
    const state = createState(linkedinStates);
    // LinkedIn scopes: r_liteprofile r_emailaddress openid
    const authorizeUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20profile%20email&prompt=login&state=${state}`;
    return { authorizeUrl, state };
  });

  server.post("/auth/linkedin/callback", async (request, reply) => {
    const body = request.body as { code?: string; redirectUri?: string; state?: string };
    if (!body?.code || !body?.redirectUri) {
      return reply.status(400).send({ error: "code and redirectUri are required" });
    }
    if (!validateState(linkedinStates, body.state)) {
      return reply.status(400).send({ error: "Invalid or missing state" });
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

    // LinkedIn may not return email in OIDC userinfo; fetch explicitly
    let primaryEmail: string | null = profile.email ?? null;
    if (!primaryEmail) {
      try {
        const emailRes = await fetch("https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        if (emailRes.ok) {
          const emailBody = await emailRes.json();
          const elements = (emailBody as any)?.elements;
          primaryEmail = elements?.[0]?.['handle~']?.emailAddress ?? null;
        } else {
          const errBody = (await emailRes.json().catch(() => ({}))) as { message?: string };
          request.log.warn({ status: emailRes.status, body: errBody }, "linkedin email fetch failed");
        }
      } catch (err) {
        request.log.warn({ err }, "linkedin email fetch failed");
      }
    }

    if (!primaryEmail) {
      return reply.status(401).send({ error: "LinkedIn email not available; ensure r_emailaddress scope and a verified email" });
    }

    const providerId = profile.sub;
    const user = await prisma.user.upsert({
      where: { provider_providerId: { provider: "linkedin", providerId } },
      create: {
        provider: "linkedin",
        providerId,
        email: primaryEmail,
        displayName: profile.name ?? null,
        avatarUrl: profile.picture ?? null,
      },
      update: {
        email: primaryEmail,
        displayName: profile.name ?? null,
        avatarUrl: profile.picture ?? null,
      },
    });

    // Persist provider grant for LinkedIn
    try {
      const maybeExpires = (tokenData as any).expires_in ? new Date(Date.now() + Number((tokenData as any).expires_in) * 1000) : undefined;
      await (prisma as any).providerGrant.upsert({
        where: { provider_providerId: { provider: "linkedin", providerId } },
        create: {
          userId: user.id,
          provider: "linkedin",
          providerId,
          accessToken: tokenData.access_token ?? "",
          scope: null,
          expiresAt: maybeExpires ?? null,
        },
        update: {
          accessToken: tokenData.access_token ?? "",
          expiresAt: maybeExpires ?? null,
        },
      });
    } catch (err) {
      request.log.warn({ err }, "persisting linkedin grant failed");
    }

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

  server.post(
    "/auth/delete",
    {
      preHandler: [server.authenticate],
    },
    async (request, reply) => {
      try {
        const userId = (request.user as { sub: string }).sub;
        const body = request.body as { confirmText?: string } | undefined;

        if (!body?.confirmText || body.confirmText !== ACCOUNT_DELETE_PHRASE) {
          return reply.status(400).send({ error: `To delete your data, type '${ACCOUNT_DELETE_PHRASE}' exactly.` });
        }

        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: "auth.delete.requested",
          source: "api",
          payload: { confirmationMatched: body.confirmText === ACCOUNT_DELETE_PHRASE },
        });

        const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true } });
        if (!user) {
          return reply.status(404).send({ error: "User not found" });
        }

        const jobId = randomBytes(12).toString("hex");
        deletionJobs.set(jobId, { userId, status: "queued", progress: 5, updatedAt: Date.now(), message: "Queued" });

        void runDeleteJob(prisma, jobId, userId, recordTelemetry, request);

        return { jobId, status: "queued" };
      } catch (err) {
        request.log.error({ err }, "account delete failed");
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: "auth.delete.error",
          source: "api",
          payload: { message: err instanceof Error ? err.message : "unknown" },
        });
        return reply.status(500).send({ error: "Unable to delete account right now" });
      }
    },
  );

    server.get(
      "/auth/delete/status",
      {
        preHandler: [server.authenticate],
      },
      async (request, reply) => {
        const userId = (request.user as { sub: string }).sub;
        const jobId = (request.query as { jobId?: string } | undefined)?.jobId;
        if (!jobId) return reply.status(400).send({ error: "jobId is required" });
        const status = deletionJobs.get(jobId);
        if (!status) return reply.status(404).send({ error: "Job not found" });
        if (status.userId !== userId) return reply.status(403).send({ error: "Forbidden" });
        return { jobId, ...status };
      },
    );

  server.post("/auth/signout", async (request, reply) => {
    try {
      // Try to identify user from Authorization Bearer token first
      let userId: string | null = null;
      try {
        const auth = (request.headers.authorization as string) || (request.headers.Authorization as unknown as string) || "";
        if (auth && auth.startsWith("Bearer ")) {
          const token = auth.slice(7);
          const payload = server.jwt.verify(token) as { sub?: string };
          if (payload?.sub) userId = payload.sub;
        }
      } catch (err) {
        // token expired/invalid - we'll try refresh token fallback
      }

      // If no userId from access token, accept refresh token in body or header
      if (!userId) {
        const body = request.body as { refreshToken?: string } | undefined;
        const provided = body?.refreshToken || (request.headers["x-refresh-token"] as string | undefined) || null;
        if (provided) {
          const found = await prisma.refreshToken.findUnique({ where: { token: provided } });
          if (found) userId = found.userId;
        }
      }

      if (!userId) {
        return reply.status(400).send({ error: "No valid session token provided" });
      }

      // Find stored provider grants and attempt to revoke them at provider
      const grants = await (prisma as any).providerGrant.findMany({ where: { userId } });
      for (const g of grants) {
        try {
          if (g.provider === "github") {
            const clientId = process.env.GITHUB_CLIENT_ID;
            const clientSecret = process.env.GITHUB_CLIENT_SECRET;
            if (clientId && clientSecret && g.accessToken) {
              const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
              // Best-effort revoke using GitHub Applications API
              await fetch(`https://api.github.com/applications/${encodeURIComponent(clientId)}/token`, {
                method: "DELETE",
                headers: {
                  Authorization: `Basic ${basic}`,
                  Accept: "application/vnd.github.v3+json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ access_token: g.accessToken }),
              }).catch(() => null);
            }
          }
          if (g.provider === "linkedin") {
            const clientId = process.env.LINKEDIN_CLIENT_ID;
            const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
            if (clientId && clientSecret && g.accessToken) {
              const params = new URLSearchParams();
              params.set("token", g.accessToken);
              // LinkedIn revoke - best-effort
              await fetch("https://www.linkedin.com/oauth/v2/revoke", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params.toString(),
              }).catch(() => null);
            }
          }
        } catch (err) {
          request.log.warn({ err, grant: g }, "revoke provider token failed");
        }
      }

      // Remove provider grants and refresh tokens from DB to ensure server-side session state cleared
      await (prisma as any).providerGrant.deleteMany({ where: { userId } }).catch(() => null);
      await prisma.refreshToken.deleteMany({ where: { userId } });

      await recordTelemetry(request, {
        ...buildTelemetryBase(request),
        eventType: "auth.signout",
        source: "api",
        payload: { userId },
      });
      return { ok: true };
    } catch (err) {
      request.log.error({ err }, "signout failed");
      return reply.status(500).send({ error: "Unable to sign out" });
    }
  });
}
