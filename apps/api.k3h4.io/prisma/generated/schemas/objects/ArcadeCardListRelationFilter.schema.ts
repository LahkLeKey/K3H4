import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional(),
  some: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional(),
  none: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional()
}).strict();
export const ArcadeCardListRelationFilterObjectSchema: z.ZodType<Prisma.ArcadeCardListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardListRelationFilter>;
export const ArcadeCardListRelationFilterObjectZodSchema = makeSchema();
