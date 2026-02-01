import {Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';

import {readUserPreferencesForUser, updateUserPreferencesForUser} from '../services/user-preferences';

import {buildTelemetryBase} from './telemetry';
import {type RecordTelemetryFn} from './types';

const userProfileSelect = {
  id: true,
  email: true,
  k3h4CoinBalance: true,
  displayName: true,
  avatarUrl: true,
} as const;

const serializeProfile = (
    profile: {k3h4CoinBalance?: Prisma.Decimal|null}&Record<string, any>,
    note: string|null,
    ) => ({
  ...profile,
  k3h4CoinBalance:
      profile.k3h4CoinBalance ? profile.k3h4CoinBalance.toFixed(2) : '0.00',
  note,
});

export function registerProfileRoutes(
    server: FastifyInstance, prisma: PrismaClient,
    recordTelemetry: RecordTelemetryFn) {
  server.get(
      '/profile',
      {
        preHandler: [server.authenticate],
      },
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const profile = await prisma.user.findUnique(
            {where: {id: userId}, select: userProfileSelect});
        if (!profile) return reply.status(404).send({error: 'User not found'});
        const preferences = await readUserPreferencesForUser(prisma, userId);
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'profile.fetch',
          source: 'api',
          payload: {hasProfile: Boolean(profile)},
        });
        return {profile: serializeProfile(profile, preferences.note ?? null)};
      },
  );

  server.patch(
      '/profile',
      {
        preHandler: [server.authenticate],
      },
      async (request, reply) => {
        const userId = (request.user as {sub: string}).sub;
        const body = request.body as {
          note?: string|null;
          preference?: {note?: string|null}
        };

        if (Object.prototype.hasOwnProperty.call(body, 'displayName') ||
            Object.prototype.hasOwnProperty.call(body, 'avatarUrl')) {
          return reply.status(400).send({
            error:
                'displayName and avatarUrl are read-only and managed by your provider'
          });
        }

        const incomingNote =
            body.note !== undefined ? body.note : body.preference?.note;

        if (incomingNote !== undefined && incomingNote !== null &&
            typeof incomingNote !== 'string') {
          return reply.status(400).send(
              {error: 'note must be a string or null'});
        }

        if (incomingNote !== undefined) {
          await updateUserPreferencesForUser(
              prisma, userId, {note: incomingNote});
        }

        const profile = await prisma.user.findUnique(
            {where: {id: userId}, select: userProfileSelect});
        const preferences = await readUserPreferencesForUser(prisma, userId);
        await recordTelemetry(request, {
          ...buildTelemetryBase(request),
          eventType: 'profile.update',
          source: 'api',
          payload: {
            updatedFields: [],
            updatedPreferences: body.note !== undefined ? ['note'] : [],
          },
        });
        return {
          profile: profile ?
              serializeProfile(profile, preferences.note ?? null) :
              null,
        };
      },
  );
}
