import '../../test/vitest-setup.ts';

import Fastify from 'fastify';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import * as culinaryLedger from '../../services/culinary-ledger';
import * as staffingActor from '../../services/staffing-actor';
import * as authEntities from '../../services/auth-entities';
import {registerAuthRoutes} from '../auth';
import {type RecordTelemetryFn} from '../types';

const recordTelemetry = vi.fn() as unknown as RecordTelemetryFn;
const userId = 'user-1';
const nativeFetch = globalThis.fetch;

function buildServer(prisma: any) {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId, email: 'user@test.com'};
  });
  server.jwt = {sign: vi.fn(() => 'access-token'), verify: vi.fn()} as any;
  registerAuthRoutes(server as any, prisma as any, recordTelemetry);
  return server;
}

const LINKEDIN_REDIRECT_URI = 'https://app/cb';

async function getLinkedinState(server: ReturnType<typeof buildServer>) {
  const res = await server.inject({
    method: 'POST',
    url: '/auth/linkedin/url',
    payload: {redirectUri: LINKEDIN_REDIRECT_URI}
  });
  expect(res.statusCode).toBe(200);
  return res.json().state as string;
}

describe('auth routes', () => {
  beforeEach(() => {
    recordTelemetry.mockClear();
    globalThis.fetch = nativeFetch;
    process.env.GITHUB_CLIENT_ID = 'gh-id';
    process.env.GITHUB_CLIENT_SECRET = 'gh-secret';
    vi.spyOn(authEntities, 'storeRefreshToken').mockResolvedValue(undefined);
    vi.spyOn(authEntities, 'upsertProviderGrant').mockResolvedValue(undefined);
    vi.spyOn(authEntities, 'readProviderGrantsForUser').mockResolvedValue([]);
    vi.spyOn(authEntities, 'deleteProviderGrantsForUser').mockResolvedValue(undefined);
    vi.spyOn(authEntities, 'deleteRefreshTokensForUser').mockResolvedValue(undefined);
    vi.spyOn(authEntities, 'findRefreshTokenEntity').mockResolvedValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    globalThis.fetch = nativeFetch;
  });

  it('returns authorize url for github', async () => {
    const prisma = {};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/url',
      payload: {redirectUri: 'https://app/cb'}
    });
    expect(res.statusCode).toBe(200);
    expect(res.json().authorizeUrl).toContain('client_id=gh-id');
  });

  it('rejects github url without redirect', async () => {
    const prisma = {};
    const server = buildServer(prisma);
    const res = await server.inject(
        {method: 'POST', url: '/auth/github/url', payload: {}});
    expect(res.statusCode).toBe(400);
  });

  it('handles github callback and issues tokens', async () => {
    const fetchMock = vi.fn((url: RequestInfo|URL) => {
      const href = String(url);
      if (href.includes('access_token')) {
        return Promise.resolve(
            {ok: true, json: async () => ({access_token: 'gh-token'})} as
            Response);
      }
      if (href.includes('api.github.com/user')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({id: 42, login: 'ghuser', email: 'user@test.com'})
        } as Response);
      }
      return Promise.resolve({ok: false, json: async () => ({})} as Response);
    });
    globalThis.fetch = fetchMock;

    const prisma = {
      user: {
        upsert: vi.fn().mockResolvedValue({id: userId, email: 'user@test.com'})
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/callback',
      payload: {code: 'abc', redirectUri: 'https://app/cb'},
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.user.upsert).toHaveBeenCalled();
    expect(authEntities.storeRefreshToken).toHaveBeenCalled();
    expect(recordTelemetry)
        .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          eventType: 'auth.github.callback.success'
        }));
  });

  it('fetches primary email when user email missing', async () => {
    const fetchMock = vi.fn((url: RequestInfo|URL) => {
      const href = String(url);
      if (href.includes('access_token'))
        return Promise.resolve(
            {ok: true, json: async () => ({access_token: 'gh-token'})} as
            Response);
      if (href.endsWith('/user'))
        return Promise.resolve(
            {ok: true, json: async () => ({id: 99, login: 'nouser'})} as
            Response);
      if (href.endsWith('/user/emails')) {
        return Promise.resolve({
          ok: true,
          json: async () =>
              ([{email: 'primary@test.com', primary: true, verified: true}])
        } as Response);
      }
      return Promise.resolve({ok: false, json: async () => ({})} as Response);
    });
    globalThis.fetch = fetchMock;

    const prisma = {
      user: {
        upsert:
            vi.fn().mockResolvedValue({id: userId, email: 'primary@test.com'})
      },
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/callback',
      payload: {code: 'abc', redirectUri: 'https://app/cb'}
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.user.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({email: 'primary@test.com'})
    }));
  });

  it('handles stale verification code', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
        {ok: false, json: async () => ({error: 'bad_verification_code'})} as
        Response);
    globalThis.fetch = fetchMock;
    const prisma = {user: {upsert: vi.fn()}};
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/callback',
      payload: {code: 'bad', redirectUri: 'https://app/cb'}
    });
    expect(res.statusCode).toBe(401);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          eventType: 'auth.github.callback.failed'
        }));
    expect(res.json().staleCode).toBe(true);
  });

  it('fails when github config missing', async () => {
    process.env.GITHUB_CLIENT_ID = '';
    const server = buildServer({});
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/callback',
      payload: {code: 'abc', redirectUri: 'https://app/cb'}
    });
    expect(res.statusCode).toBe(500);
  });

  it('handles linkedin missing config', async () => {
    process.env.LINKEDIN_CLIENT_ID = 'ln-id';
    process.env.LINKEDIN_CLIENT_SECRET = 'ln-secret';
    const server = buildServer({});
    const state = await getLinkedinState(server);
    process.env.LINKEDIN_CLIENT_ID = '';
    process.env.LINKEDIN_CLIENT_SECRET = '';
    const res = await server.inject({
      method: 'POST',
      url: '/auth/linkedin/callback',
      payload: {code: 'c', redirectUri: LINKEDIN_REDIRECT_URI, state}
    });
    expect(res.statusCode).toBe(500);
  });

  it('rejects linkedin callback when code or redirect missing', async () => {
    process.env.LINKEDIN_CLIENT_ID = 'ln-id';
    process.env.LINKEDIN_CLIENT_SECRET = 'ln-secret';
    const server = buildServer({});
    const res = await server.inject(
        {method: 'POST', url: '/auth/linkedin/callback', payload: {code: ''}});
    expect(res.statusCode).toBe(400);
  });

  it('handles github profile fetch failure', async () => {
    const fetchMock = vi.fn((url: RequestInfo|URL) => {
      const href = String(url);
      if (href.includes('access_token'))
        return Promise.resolve(
            {ok: true, json: async () => ({access_token: 'tok'})} as Response);
      return Promise.resolve(
          {ok: false, status: 500, json: async () => ({message: 'boom'})} as
          Response);
    });
    globalThis.fetch = fetchMock;
    const server = buildServer({user: {upsert: vi.fn()}});
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/callback',
      payload: {code: 'abc', redirectUri: 'https://app/cb'}
    });
    expect(res.statusCode).toBe(401);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
          eventType: 'auth.github.callback.failed'
        }));
  });

  it('fails when github email fetch returns non-200', async () => {
    const fetchMock = vi.fn((url: RequestInfo|URL) => {
      const href = String(url);
      if (href.includes('access_token'))
        return Promise.resolve(
            {ok: true, json: async () => ({access_token: 'tok'})} as Response);
      if (href.endsWith('/user'))
        return Promise.resolve(
            {ok: true, json: async () => ({id: 77, login: 'no-email'})} as
            Response);
      return Promise.resolve(
          {ok: false, status: 401, json: async () => ({message: 'denied'})} as
          Response);
    });
    globalThis.fetch = fetchMock;
    const server = buildServer({user: {upsert: vi.fn()}});
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/callback',
      payload: {code: 'abc', redirectUri: 'https://app/cb'}
    });
    expect(res.statusCode).toBe(401);
  });

  it('throws when github email still missing', async () => {
    const fetchMock = vi.fn((url: RequestInfo|URL) => {
      const href = String(url);
      if (href.includes('access_token'))
        return Promise.resolve(
            {ok: true, json: async () => ({access_token: 'tok'})} as Response);
      if (href.endsWith('/user'))
        return Promise.resolve(
            {ok: true, json: async () => ({id: 88, login: 'no-email'})} as
            Response);
      if (href.endsWith('/user/emails'))
        return Promise.resolve(
            {ok: true, json: async () => ([] as any[])} as Response);
      return Promise.resolve({ok: false, json: async () => ({})} as Response);
    });
    globalThis.fetch = fetchMock;
    const server = buildServer({user: {upsert: vi.fn()}});
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/callback',
      payload: {code: 'abc', redirectUri: 'https://app/cb'}
    });
    expect(res.statusCode).toBe(401);
  });

  it('logs when email fetch throws and returns unauthorized', async () => {
    const fetchMock = vi.fn((url: RequestInfo|URL) => {
      const href = String(url);
      if (href.includes('access_token'))
        return Promise.resolve(
            {ok: true, json: async () => ({access_token: 'tok'})} as Response);
      if (href.endsWith('/user'))
        return Promise.resolve(
            {ok: true, json: async () => ({id: 123, login: 'erruser'})} as
            Response);
      if (href.endsWith('/user/emails'))
        return Promise.reject(new Error('network'));
      return Promise.resolve({ok: false, json: async () => ({})} as Response);
    });
    globalThis.fetch = fetchMock;
    const server = buildServer({user: {upsert: vi.fn()}});
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/callback',
      payload: {code: 'abc', redirectUri: 'https://app/cb'}
    });
    expect(res.statusCode).toBe(401);
  });

  it('handles callback exceptions', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network'));
    globalThis.fetch = fetchMock;
    const server = buildServer({user: {upsert: vi.fn()}});
    const res = await server.inject({
      method: 'POST',
      url: '/auth/github/callback',
      payload: {code: 'abc', redirectUri: 'https://app/cb'}
    });
    expect(res.statusCode).toBe(500);
    expect(recordTelemetry)
        .toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'auth.github.callback.error'}));
  });

  it('handles linkedin success', async () => {
    const fetchMock = vi.fn((url: RequestInfo|URL) => {
      const href = String(url);
      if (href.includes('accessToken'))
        return Promise.resolve(
            {ok: true, json: async () => ({access_token: 'ln-token'})} as
            Response);
      return Promise.resolve({
        ok: true,
        json: async () => ({sub: 'ln-1', name: 'L', email: 'l@test.com'})
      } as Response);
    });
    globalThis.fetch = fetchMock;
    process.env.LINKEDIN_CLIENT_ID = 'ln-id';
    process.env.LINKEDIN_CLIENT_SECRET = 'ln-secret';
    const prisma = {
      user: {
        upsert: vi.fn().mockResolvedValue({id: 'ln-1', email: 'l@test.com'})
      },
    };
    const server = buildServer(prisma);
    const state = await getLinkedinState(server);
    const res = await server.inject({
      method: 'POST',
      url: '/auth/linkedin/callback',
      payload: {code: 'c', redirectUri: LINKEDIN_REDIRECT_URI, state}
    });
    expect(res.statusCode).toBe(200);
    expect(prisma.user.upsert).toHaveBeenCalled();
  });

  it('handles linkedin token failure', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
        {ok: false, json: async () => ({error: 'bad'})} as Response);
    globalThis.fetch = fetchMock;
    process.env.LINKEDIN_CLIENT_ID = 'ln-id';
    process.env.LINKEDIN_CLIENT_SECRET = 'ln-secret';
    const server = buildServer({user: {upsert: vi.fn()}});
    const state = await getLinkedinState(server);
    const res = await server.inject({
      method: 'POST',
      url: '/auth/linkedin/callback',
      payload: {code: 'c', redirectUri: LINKEDIN_REDIRECT_URI, state}
    });
    expect(res.statusCode).toBe(401);
  });

  it('handles linkedin profile fetch failure', async () => {
    const fetchMock = vi.fn((url: RequestInfo|URL) => {
      const href = String(url);
      if (href.includes('accessToken'))
        return Promise.resolve(
            {ok: true, json: async () => ({access_token: 'ln-token'})} as
            Response);
      return Promise.resolve({ok: false, json: async () => ({})} as Response);
    });
    globalThis.fetch = fetchMock;
    process.env.LINKEDIN_CLIENT_ID = 'ln-id';
    process.env.LINKEDIN_CLIENT_SECRET = 'ln-secret';
    const server = buildServer({user: {upsert: vi.fn()}});
    const state = await getLinkedinState(server);
    const res = await server.inject({
      method: 'POST',
      url: '/auth/linkedin/callback',
      payload: {code: 'c', redirectUri: LINKEDIN_REDIRECT_URI, state}
    });
    expect(res.statusCode).toBe(401);
  });

  it('returns current user', async () => {
    const prisma = {
      user: {
        findUnique:
            vi.fn().mockResolvedValue({id: userId, email: 'user@test.com'})
      }
    };
    const server = buildServer(prisma);
    const res = await server.inject({method: 'GET', url: '/auth/me'});
    expect(res.statusCode).toBe(200);
    expect(res.json().user.email).toBe('user@test.com');
  });

  it('deletes account when confirmation matches', async () => {
    const prisma = {
      telemetryEvent: {deleteMany: vi.fn().mockResolvedValue({count: 1})},
      entity: {deleteMany: vi.fn().mockResolvedValue({count: 0})},
      actor: {deleteMany: vi.fn().mockResolvedValue({count: 0})},
      freightLoad: {deleteMany: vi.fn().mockResolvedValue({count: 0})},
      warehouseItem: {deleteMany: vi.fn().mockResolvedValue({count: 0})},
      userPreference: {deleteMany: vi.fn().mockResolvedValue({count: 0})},
      user: {
        findUnique:
            vi.fn().mockResolvedValue({id: userId, email: 'user@test.com'}),
        delete: vi.fn().mockResolvedValue({id: userId}),
      },
      $transaction: vi.fn(
          async (operations: Promise<unknown>[]) => Promise.all(operations)),
    };
    const deleteStaffingSpy =
        vi.spyOn(staffingActor, 'deleteStaffingActorWithEntities')
            .mockResolvedValue({entities: {count: 0}, actors: {count: 0}});
    const deleteCulinarySpy =
        vi.spyOn(culinaryLedger, 'deleteCulinaryActorWithEntities')
            .mockResolvedValue({entities: {count: 0}, actors: {count: 0}});
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/auth/delete',
      payload: {confirmText: 'Delete-My-K3H4-Data'}
    });
    expect(res.statusCode).toBe(200);
    const jobId = res.json().jobId;
    expect(jobId).toBeTruthy();

    // poll status once; job should have completed synchronously in test mocks
    const statusRes = await server.inject(
        {method: 'GET', url: `/auth/delete/status?jobId=${jobId}`});
    expect(statusRes.statusCode).toBe(200);
    expect(statusRes.json().status).toBe('done');
    expect(prisma.user.delete).toHaveBeenCalledWith({where: {id: userId}});
    expect(deleteStaffingSpy).toHaveBeenCalledWith(prisma, userId);
    expect(deleteCulinarySpy).toHaveBeenCalledWith(prisma, userId);
    expect(authEntities.deleteProviderGrantsForUser)
      .toHaveBeenCalledWith(prisma, userId);
    expect(authEntities.deleteRefreshTokensForUser)
      .toHaveBeenCalledWith(prisma, userId);
  });

  it('rejects delete when confirmation text is wrong', async () => {
    const prisma = {
      telemetryEvent: {deleteMany: vi.fn()},
      user: {findUnique: vi.fn(), delete: vi.fn()},
      $transaction: vi.fn(),
    };
    const server = buildServer(prisma);
    const res = await server.inject(
        {method: 'POST', url: '/auth/delete', payload: {confirmText: 'nope'}});
    expect(res.statusCode).toBe(400);
    expect(prisma.telemetryEvent.deleteMany).not.toHaveBeenCalled();
    expect(recordTelemetry)
        .not.toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({eventType: 'auth.delete.requested'}));
  });

  it('returns 404 when user is missing', async () => {
    const prisma = {
      telemetryEvent: {deleteMany: vi.fn()},
      user: {findUnique: vi.fn().mockResolvedValue(null), delete: vi.fn()},
      $transaction: vi.fn(),
    };
    const server = buildServer(prisma);
    const res = await server.inject({
      method: 'POST',
      url: '/auth/delete',
      payload: {confirmText: 'Delete-My-K3H4-Data'}
    });
    expect(res.statusCode).toBe(404);
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });
});
