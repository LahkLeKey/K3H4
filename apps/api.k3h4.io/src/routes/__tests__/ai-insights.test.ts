import '../../test/vitest-setup';

import Fastify from 'fastify';
import {beforeEach, describe, expect, it, vi} from 'vitest';

import type {AiOperationsKit} from '../../kits/ai-operations';
import {registerAiInsightsRoutes} from '../ai-insights';
import type {RecordTelemetryFn} from '../types';

const userId = 'user-1';
const now = new Date('2026-01-01T00:00:00.000Z');
const recordTelemetry = vi.fn<RecordTelemetryFn>();
const kit = {
  listInsights: vi.fn(),
  createInsight: vi.fn(),
} as unknown as AiOperationsKit;

function buildServer() {
  const server = Fastify();
  server.decorate('authenticate', async (request: any) => {
    request.user = {sub: userId};
  });
  registerAiInsightsRoutes(
      server as any, {} as any, recordTelemetry, kit);
  return server;
}

describe('AI insights routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('lists insights through the Kit and records telemetry', async () => {
    vi.mocked(kit.listInsights).mockResolvedValue([{
      id: 'insight-1',
      description: 'Stock improved.',
      targetType: 'warehouse_item',
      targetId: 'item-1',
      targetLabel: 'Rice',
      metadata: null,
      payload: null,
      createdAt: now,
      updatedAt: now,
    }]);
    const response = await buildServer().inject({
      method: 'GET',
      url: '/ai/insights?limit=3&targetType=warehouse_item',
      headers: {authorization: 'Bearer token'},
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({insights: [{
      id: 'insight-1',
      description: 'Stock improved.',
      targetType: 'warehouse_item',
      targetId: 'item-1',
      targetLabel: 'Rice',
      metadata: null,
      payload: null,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    }]});
    expect(kit.listInsights).toHaveBeenCalledWith(
        userId, 'warehouse_item', 3);
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'ai.insights.list'}));
  });

  it('creates an insight through the Kit and rejects blank descriptions', async () => {
    vi.mocked(kit.createInsight).mockResolvedValue({
      insight: {
        id: 'insight-2',
        description: 'Stock improved.',
        targetType: null,
        targetId: null,
        targetLabel: null,
        metadata: null,
        payload: null,
        createdAt: now,
        updatedAt: now,
      },
      aiGenerated: true,
    });
    const server = buildServer();
    const response = await server.inject({
      method: 'POST',
      url: '/ai/insights',
      headers: {authorization: 'Bearer token'},
      payload: {description: 'Inventory changed'},
    });
    const invalid = await server.inject({
      method: 'POST',
      url: '/ai/insights',
      headers: {authorization: 'Bearer token'},
      payload: {description: ' '},
    });

    expect(response.statusCode).toBe(200);
    expect(response.json().insight.description).toBe('Stock improved.');
    expect(kit.createInsight).toHaveBeenCalledWith(expect.objectContaining({
      userId,
      description: 'Inventory changed',
    }));
    expect(recordTelemetry).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({eventType: 'ai.insight.create'}));
    expect(invalid.statusCode).toBe(400);
  });
});