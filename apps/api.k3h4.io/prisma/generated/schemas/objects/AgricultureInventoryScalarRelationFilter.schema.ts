import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './AgricultureInventoryWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => AgricultureInventoryWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => AgricultureInventoryWhereInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryScalarRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureInventoryScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryScalarRelationFilter>;
export const AgricultureInventoryScalarRelationFilterObjectZodSchema = makeSchema();
