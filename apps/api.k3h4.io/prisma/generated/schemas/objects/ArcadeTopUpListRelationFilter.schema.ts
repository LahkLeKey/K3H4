import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeTopUpWhereInputObjectSchema as ArcadeTopUpWhereInputObjectSchema } from './ArcadeTopUpWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ArcadeTopUpWhereInputObjectSchema).optional(),
  some: z.lazy(() => ArcadeTopUpWhereInputObjectSchema).optional(),
  none: z.lazy(() => ArcadeTopUpWhereInputObjectSchema).optional()
}).strict();
export const ArcadeTopUpListRelationFilterObjectSchema: z.ZodType<Prisma.ArcadeTopUpListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpListRelationFilter>;
export const ArcadeTopUpListRelationFilterObjectZodSchema = makeSchema();
