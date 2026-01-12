import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './AgricultureInventoryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AgricultureInventoryWhereInputObjectSchema).optional(),
  some: z.lazy(() => AgricultureInventoryWhereInputObjectSchema).optional(),
  none: z.lazy(() => AgricultureInventoryWhereInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryListRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureInventoryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryListRelationFilter>;
export const AgricultureInventoryListRelationFilterObjectZodSchema = makeSchema();
