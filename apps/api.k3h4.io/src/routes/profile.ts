import { Prisma, PrismaClient } from "@prisma/client";
import { type FastifyInstance } from "fastify";
import { type RecordTelemetryFn } from "./types";

const userProfileSelect = {
  id: true,
  email: true,
  k3h4CoinBalance: true,
  displayName: true,
  avatarUrl: true,
  preference: {
    select: {
      theme: true,
      locale: true,
      timezone: true,
      marketingOptIn: true,
      note: true,
    },
  },
} as const;

const serializeProfile = (
  profile: {
    k3h4CoinBalance?: Prisma.Decimal | null;
    preference?: { note?: string | null } | null;
  } & Record<string, any>,
) => ({
  ...profile,
  k3h4CoinBalance: profile.k3h4CoinBalance ? profile.k3h4CoinBalance.toFixed(2) : "0.00",
  note: profile.preference?.note ?? null,
});

export function registerProfileRoutes(server: FastifyInstance, prisma: PrismaClient, recordTelemetry: RecordTelemetryFn) {
  server.get(
    "/profile",
    {
      preHandler: [server.authenticate],
    },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;

      await prisma.userPreference.upsert({
        where: { userId },
        update: {},
        create: { userId },
      });

      const profile = await prisma.user.findUnique({ where: { id: userId }, select: userProfileSelect });
      if (!profile) return reply.status(404).send({ error: "User not found" });
      await recordTelemetry(request, { eventType: "profile.fetch", source: "api" });
      return { profile: serializeProfile(profile) };
    },
  );

  server.patch(
    "/profile",
    {
      preHandler: [server.authenticate],
    },
    async (request, reply) => {
      const userId = (request.user as { sub: string }).sub;
      const body = request.body as { note?: string | null; preference?: { note?: string | null } };

      if (Object.prototype.hasOwnProperty.call(body, "displayName") || Object.prototype.hasOwnProperty.call(body, "avatarUrl")) {
        return reply.status(400).send({ error: "displayName and avatarUrl are read-only and managed by your provider" });
      }

      const incomingNote = body.note !== undefined ? body.note : body.preference?.note;

      if (incomingNote !== undefined) {
        if (incomingNote !== null && typeof incomingNote !== "string") {
          return reply.status(400).send({ error: "note must be a string or null" });
        }
      }

      const existingPref = await prisma.userPreference.findUnique({ where: { userId }, select: { note: true } });
      const nextNote = incomingNote !== undefined ? incomingNote : existingPref?.note ?? null;

      await prisma.userPreference.upsert({
        where: { userId },
        update: { note: nextNote },
        create: { userId, note: nextNote },
      });

      const profile = await prisma.user.findUnique({ where: { id: userId }, select: userProfileSelect });
      await recordTelemetry(request, {
        eventType: "profile.update",
        source: "api",
        payload: {
          updatedFields: [],
          updatedPreferences: body.note !== undefined ? ["note"] : [],
        },
      });
      return { profile: profile ? serializeProfile(profile) : null };
    },
  );
}
