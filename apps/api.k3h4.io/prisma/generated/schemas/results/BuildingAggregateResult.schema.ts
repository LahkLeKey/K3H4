import * as z from 'zod';
export const BuildingAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    osmId: z.number(),
    type: z.number(),
    addressHouseNumber: z.number(),
    addressStreet: z.number(),
    addressCity: z.number(),
    addressPostcode: z.number(),
    addressState: z.number(),
    addressCountry: z.number(),
    geometry: z.number(),
    POIs: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    osmId: z.bigint().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    osmId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    osmId: z.bigint().nullable(),
    addressHouseNumber: z.string().nullable(),
    addressStreet: z.string().nullable(),
    addressCity: z.string().nullable(),
    addressPostcode: z.string().nullable(),
    addressState: z.string().nullable(),
    addressCountry: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    osmId: z.bigint().nullable(),
    addressHouseNumber: z.string().nullable(),
    addressStreet: z.string().nullable(),
    addressCity: z.string().nullable(),
    addressPostcode: z.string().nullable(),
    addressState: z.string().nullable(),
    addressCountry: z.string().nullable()
  }).nullable().optional()});