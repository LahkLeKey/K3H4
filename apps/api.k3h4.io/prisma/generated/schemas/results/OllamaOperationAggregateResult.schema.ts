import * as z from 'zod';
export const OllamaOperationAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    source: z.number(),
    sessionId: z.number(),
    session: z.number(),
    model: z.number(),
    temperature: z.number(),
    systemPrompt: z.number(),
    requestBody: z.number(),
    responseBody: z.number(),
    statusCode: z.number(),
    errorMessage: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    temperature: z.number().nullable(),
    statusCode: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    temperature: z.number().nullable(),
    statusCode: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    source: z.string().nullable(),
    sessionId: z.string().nullable(),
    model: z.string().nullable(),
    temperature: z.number().nullable(),
    systemPrompt: z.string().nullable(),
    statusCode: z.number().int().nullable(),
    errorMessage: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    source: z.string().nullable(),
    sessionId: z.string().nullable(),
    model: z.string().nullable(),
    temperature: z.number().nullable(),
    systemPrompt: z.string().nullable(),
    statusCode: z.number().int().nullable(),
    errorMessage: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});