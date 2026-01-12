import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadePrizeWhereInputObjectSchema as ArcadePrizeWhereInputObjectSchema } from './ArcadePrizeWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => ArcadePrizeWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => ArcadePrizeWhereInputObjectSchema).optional()
}).strict();
export const ArcadePrizeScalarRelationFilterObjectSchema: z.ZodType<Prisma.ArcadePrizeScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeScalarRelationFilter>;
export const ArcadePrizeScalarRelationFilterObjectZodSchema = makeSchema();
