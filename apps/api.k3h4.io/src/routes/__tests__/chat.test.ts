import '../../test/vitest-setup';

import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import {ChatSessionNotFoundError, type ChatSessionsKit} from '../../kits/chat-sessions';
import {registerChatRoutes} from '../chat';
import type {RecordTelemetryFn} from '../types';

const userId = 'user-1';
const createdAt = new Date('2026-01-01T00:00:00.000Z');
const session = {
  id: 'session-1',
  title: 'Plan',
  systemPrompt: null,
  model: 'llama3.2:1b',
  temperature: 0.2,
  metadata: null,
  createdAt,
  updatedAt: createdAt,
  messageCount: 0,
  lastMessage: null,
};
const assistant = {
  id: 'message-1',
  role: 'ASSISTANT' as const,
  content: 'Ready.',
  metadata: null,
  createdAt,
};
const recordTelemetry = vi.fn<RecordTelemetryFn>();
const kit = {
  listSessions: vi.fn(),
  listModels: vi.fn().mockReturnValue(['llama3.2:1b']),
  createSession: vi.fn(),
  listMessages: vi.fn(),
  sendMessage: vi.fn(),
} as unknown as ChatSessionsKit;

function buildServer() {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerChatRoutes(server as any, {} as any, recordTelemetry, kit);
  return server;
}

const auth = {authorization: 'Bearer token'};

describe('chat routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(kit.listModels).mockReturnValue(['llama3.2:1b']);
  });

  it('lists and creates sessions through the Kit', async () => {
    vi.mocked(kit.listSessions).mockResolvedValue([session]);
    vi.mocked(kit.createSession).mockResolvedValue(session);
    const server = buildServer();

    const listed = await server.inject({
      method: 'GET', url: '/chat/sessions?limit=6', headers: auth,
    });
    const created = await server.inject({
      method: 'POST',
      url: '/chat/sessions',
      headers: auth,
      payload: {title: 'Plan'},
    });

    expect(listed.statusCode).toBe(200);
    expect(listed.json().sessions[0].createdAt).toBe(createdAt.toISOString());
    expect(kit.listSessions).toHaveBeenCalledWith(userId, 6);
    expect(created.statusCode).toBe(200);
    expect(kit.createSession).toHaveBeenCalledWith(expect.objectContaining({
      userId, title: 'Plan',
    }));
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'chat.session.create'}));
  });

  it('maps missing sessions to 404', async () => {
    vi.mocked(kit.listMessages).mockRejectedValue(
        new ChatSessionNotFoundError());
    const response = await buildServer().inject({
      method: 'GET',
      url: '/chat/sessions/missing/messages',
      headers: auth,
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toEqual({error: 'Session not found'});
  });

  it('sends messages through the Kit and preserves the response shape', async () => {
    vi.mocked(kit.sendMessage).mockResolvedValue({
      session: {...session, messageCount: 1, lastMessage: assistant},
      message: assistant,
    });
    const response = await buildServer().inject({
      method: 'POST',
      url: '/chat/sessions/session-1/messages',
      headers: auth,
      payload: {message: 'Hello'},
    });

    expect(response.statusCode, response.body).toBe(200);
    expect(response.json()).toMatchObject({
      message: {id: 'message-1', role: 'ASSISTANT', content: 'Ready.'},
      assistant: {id: 'message-1', role: 'ASSISTANT', content: 'Ready.'},
      session: {id: 'session-1', messageCount: 1},
    });
    expect(kit.sendMessage).toHaveBeenCalledWith(expect.objectContaining({
      userId, sessionId: 'session-1', message: 'Hello',
    }));
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'chat.message.send'}));
  });

  it('maps provider failures to 502 and error telemetry', async () => {
    vi.mocked(kit.sendMessage).mockRejectedValue(new Error('offline'));
    const response = await buildServer().inject({
      method: 'POST',
      url: '/chat/sessions/session-1/messages',
      headers: auth,
      payload: {message: 'Hello'},
    });

    expect(response.statusCode).toBe(502);
    expect(response.json()).toEqual({error: 'offline'});
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'chat.message.send', error: true}));
  });
});