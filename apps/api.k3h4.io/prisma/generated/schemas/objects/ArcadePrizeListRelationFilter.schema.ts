import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './ArcadePrizeWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => ArcadePrizeWhereInputObjectSchema).optional(),
  some: z.lazy(() => ArcadePrizeWhereInputObjectSchema).optional(),
  none: z.lazy(() => ArcadePrizeWhereInputObjectSchema).optional()
}).strict();
export const ArcadePrizeListRelationFilterObjectSchema: z.ZodType<Prisma.ArcadePrizeListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeListRelationFilter>;
export const ArcadePrizeListRelationFilterObjectZodSchema = makeSchema();
