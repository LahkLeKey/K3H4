import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionWhereInputObjectSchema as ArcadeSessionWhereInputObjectSchema } from './ArcadeSessionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ArcadeSessionWhereInputObjectSchema).optional(),
  some: z.lazy(() => ArcadeSessionWhereInputObjectSchema).optional(),
  none: z.lazy(() => ArcadeSessionWhereInputObjectSchema).optional()
}).strict();
export const ArcadeSessionListRelationFilterObjectSchema: z.ZodType<Prisma.ArcadeSessionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionListRelationFilter>;
export const ArcadeSessionListRelationFilterObjectZodSchema = makeSchema();
