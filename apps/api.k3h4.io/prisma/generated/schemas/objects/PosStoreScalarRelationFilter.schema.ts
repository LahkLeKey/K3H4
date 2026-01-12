import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './PosStoreWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => PosStoreWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => PosStoreWhereInputObjectSchema).optional()
}).strict();
export const PosStoreScalarRelationFilterObjectSchema: z.ZodType<Prisma.PosStoreScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreScalarRelationFilter>;
export const PosStoreScalarRelationFilterObjectZodSchema = makeSchema();
