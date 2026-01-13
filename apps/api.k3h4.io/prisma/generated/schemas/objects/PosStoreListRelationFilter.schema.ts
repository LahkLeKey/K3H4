import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreWhereInputObjectSchema as PosStoreWhereInputObjectSchema } from './PosStoreWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PosStoreWhereInputObjectSchema).optional(),
  some: z.lazy(() => PosStoreWhereInputObjectSchema).optional(),
  none: z.lazy(() => PosStoreWhereInputObjectSchema).optional()
}).strict();
export const PosStoreListRelationFilterObjectSchema: z.ZodType<Prisma.PosStoreListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreListRelationFilter>;
export const PosStoreListRelationFilterObjectZodSchema = makeSchema();
