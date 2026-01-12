import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  dataset: z.literal(true).optional(),
  scope: z.literal(true).optional(),
  releasedOn: z.literal(true).optional(),
  note: z.literal(true).optional(),
  fetchedAt: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const UsdaReleaseMaxAggregateInputObjectSchema: z.ZodType<Prisma.UsdaReleaseMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UsdaReleaseMaxAggregateInputType>;
export const UsdaReleaseMaxAggregateInputObjectZodSchema = makeSchema();
