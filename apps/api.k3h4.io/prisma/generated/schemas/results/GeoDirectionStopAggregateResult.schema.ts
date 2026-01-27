import * as z from 'zod';
export const GeoDirectionStopAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    directionId: z.number(),
    direction: z.number(),
    sequence: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    label: z.number(),
    address: z.number(),
    source: z.number(),
    osmId: z.number(),
    metadata: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    sequence: z.number().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    osmId: z.bigint().nullable()
  }).nullable().optional(),
  _avg: z.object({
    sequence: z.number().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    osmId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    directionId: z.string().nullable(),
    sequence: z.number().int().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    label: z.string().nullable(),
    address: z.string().nullable(),
    source: z.string().nullable(),
    osmId: z.bigint().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    directionId: z.string().nullable(),
    sequence: z.number().int().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    label: z.string().nullable(),
    address: z.string().nullable(),
    source: z.string().nullable(),
    osmId: z.bigint().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});