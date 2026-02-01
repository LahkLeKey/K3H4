import {Prisma, PrismaClient} from '@prisma/client';
import {type FastifyInstance} from 'fastify';
import * as z from 'zod';

import {AuthHeaderSchema, StandardErrorResponses, toJsonSchema, withExamples} from '../lib/schemas/openapi';
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
  const authHeader = toJsonSchema(AuthHeaderSchema, 'AuthHeader');
  const profileSchema = z.object({
                           id: z.string().min(1),
                           email: z.string().email().or(z.string().min(1)),
                           k3h4CoinBalance: z.string().min(1),
                           displayName: z.string().nullable().optional(),
                           avatarUrl: z.string().nullable().optional(),
                           note: z.string().nullable().optional(),
                         }).passthrough();

  server.get(
      '/profile',
      {
        preHandler: [server.authenticate],
        schema: {
          summary: 'Get profile',
          description: 'Fetches the current user profile and preferences.',
          operationId: 'profile_get',
          tags: ['profile'],
          headers: authHeader,
          security: [{bearerAuth: []}],
          response: {
            200: withExamples(
                toJsonSchema(
                    z.object({profile: profileSchema}).strict(),
                    'ProfileGetResponse'),
                [{
                  profile: {
                    id: 'user_01',
                    email: 'user@example.com',
                    k3h4CoinBalance: '12.50',
                    displayName: 'K3H4 User',
                    avatarUrl: 'https://example.com/avatar.png',
                    note: 'Prefers SMS updates',
                  },
                }]),
            ...StandardErrorResponses,
          },
        },
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
        schema: {
          summary: 'Update profile preferences',
          description: 'Updates profile preferences like note.',
          operationId: 'profile_update',
          tags: ['profile'],
          headers: authHeader,
          security: [{bearerAuth: []}],
          body: toJsonSchema(
              z.object({
                 note: z.string().nullable().optional(),
                 preference: z.object({
                                note: z.string().nullable().optional(),
                              }).optional(),
               }).strict(),
              'ProfileUpdateBody'),
          response: {
            200: withExamples(
                toJsonSchema(
                    z.object({profile: profileSchema.nullable()}).strict(),
                    'ProfileUpdateResponse'),
                [{
                  profile: {
                    id: 'user_01',
                    email: 'user@example.com',
                    k3h4CoinBalance: '12.50',
                    displayName: 'K3H4 User',
                    avatarUrl: 'https://example.com/avatar.png',
                    note: 'Updated note',
                  },
                }]),
            ...StandardErrorResponses,
          },
        },
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
