import '../../test/vitest-setup';

import {describe, expect, it, vi} from 'vitest';

import {createAiOperationsKit} from './index';
import {OllamaProviderError, type OllamaChatRequest} from './ollama-provider';

const input = {
  userId: 'user-1',
  description: 'Inventory changed',
  targetType: 'warehouse_item',
  targetId: 'item-1',
  targetLabel: 'Rice',
  metadata: {source: 'test'},
  payload: {quantity: 4},
  model: 'llama3.2:1b',
  systemPrompt: null,
};

describe('AI operations Kit', () => {
  it('generates, logs, and persists an insight through host adapters', async () => {
    const provider = {
      chat: vi.fn().mockResolvedValue({
        content: 'Inventory is now four units.',
        requestBody: {model: input.model, messages: [], stream: false},
        responseBody: {message: {content: 'Inventory is now four units.'}},
        statusCode: 200,
      }),
    };
    const persistence = {
      listInsights: vi.fn(),
      createInsight: vi.fn(async (params) => ({
        id: 'insight-1',
        ...params,
        createdAt: new Date('2026-01-01T00:00:00.000Z'),
        updatedAt: new Date('2026-01-01T00:00:00.000Z'),
      })),
    };
    const recordOperation = vi.fn();
    const kit = createAiOperationsKit({provider, persistence, recordOperation});

    const result = await kit.createInsight(input);

    expect(provider.chat).toHaveBeenCalledWith(expect.objectContaining({
      model: input.model,
      stream: false,
      messages: expect.arrayContaining([
        expect.objectContaining({role: 'system'}),
        expect.objectContaining({role: 'user'}),
      ]),
    }));
    expect(persistence.createInsight).toHaveBeenCalledWith(expect.objectContaining({
      description: 'Inventory is now four units.',
    }));
    expect(recordOperation).toHaveBeenCalledWith(expect.objectContaining({
      source: 'insights',
      statusCode: 200,
      errorMessage: null,
    }));
    expect(result.aiGenerated).toBe(true);
  });

  it('persists the draft and logs provider failures', async () => {
    const requestBody: OllamaChatRequest = {
      model: input.model,
      messages: [],
      stream: false,
    };
    const provider = {
      chat: vi.fn().mockRejectedValue(new OllamaProviderError('offline', {
        requestBody,
        responseBody: {},
        statusCode: null,
      })),
    };
    const persistence = {
      listInsights: vi.fn(),
      createInsight: vi.fn(async (params) => ({
        id: 'insight-2',
        ...params,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    };
    const recordOperation = vi.fn();
    const warn = vi.fn();
    const kit = createAiOperationsKit({
      provider, persistence, recordOperation, warn,
    });

    const result = await kit.createInsight(input);

    expect(result.insight.description).toBe(input.description);
    expect(result.aiGenerated).toBe(false);
    expect(recordOperation).toHaveBeenCalledWith(expect.objectContaining({
      errorMessage: 'offline',
      statusCode: null,
    }));
    expect(warn).toHaveBeenCalled();
  });
});