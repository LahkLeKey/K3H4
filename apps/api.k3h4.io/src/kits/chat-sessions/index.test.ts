import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

import {createChatSessionsKit} from './index';

const createdAt = new Date('2026-01-01T00:00:00.000Z');
const session = {
  id: 'session-1',
  title: null,
  systemPrompt: 'Be brief',
  model: 'llama3.2:1b',
  temperature: 0.2,
  metadata: null,
  createdAt,
  updatedAt: createdAt,
};

describe('Chat sessions Kit', () => {
  it('persists a message and sends non-streaming ordered history', async () => {
    const persistence = {
      listSessions: vi.fn(),
      createSession: vi.fn(),
      findSession: vi.fn().mockResolvedValue(session),
      listMessages: vi.fn().mockResolvedValue([{
        id: 'old-message',
        role: 'ASSISTANT' as const,
        content: 'Earlier reply',
        metadata: null,
        createdAt: new Date('2025-12-31T23:59:00.000Z'),
      }]),
      createMessage: vi.fn()
                         .mockResolvedValueOnce({
                           id: 'user-message',
                           role: 'USER',
                           content: 'Plan today',
                           metadata: null,
                           createdAt,
                         })
                         .mockResolvedValueOnce({
                           id: 'assistant-message',
                           role: 'ASSISTANT',
                           content: 'Ship and restock.',
                           metadata: null,
                           createdAt,
                         }),
      updateSession: vi.fn().mockResolvedValue({
        ...session,
        title: 'Plan today',
        updatedAt: new Date('2026-01-01T00:01:00.000Z'),
      }),
      countMessages: vi.fn().mockResolvedValue(3),
    };
    const provider = {
      chat: vi.fn().mockResolvedValue({
        content: 'Ship and restock.',
        requestBody: {},
        responseBody: {message: {content: 'Ship and restock.'}},
        statusCode: 200,
      }),
    };
    const recordOperation = vi.fn();
    const kit = createChatSessionsKit({
      persistence, provider, recordOperation, historyLimit: 32,
    });

    const result = await kit.sendMessage({
      userId: 'user-1',
      sessionId: session.id,
      message: 'Plan today',
      metadata: null,
    });

    expect(provider.chat).toHaveBeenCalledWith({
      model: 'llama3.2:1b',
      temperature: 0.2,
      messages: [
        {role: 'system', content: 'Be brief'},
        {role: 'assistant', content: 'Earlier reply'},
        {role: 'user', content: 'Plan today'},
      ],
      stream: false,
    });
    expect(persistence.createMessage).toHaveBeenNthCalledWith(2, {
      sessionId: session.id,
      role: 'ASSISTANT',
      content: 'Ship and restock.',
      metadata: null,
    });
    expect(recordOperation).toHaveBeenCalledWith(expect.objectContaining({
      source: 'chat',
      sessionId: session.id,
      statusCode: 200,
      errorMessage: null,
    }));
    expect(result.session).toMatchObject({title: 'Plan today', messageCount: 3});
    expect(result.message.id).toBe('assistant-message');
  });
});