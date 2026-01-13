import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureResourceWhereInputObjectSchema as AgricultureResourceWhereInputObjectSchema } from './AgricultureResourceWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AgricultureResourceWhereInputObjectSchema).optional(),
  some: z.lazy(() => AgricultureResourceWhereInputObjectSchema).optional(),
  none: z.lazy(() => AgricultureResourceWhereInputObjectSchema).optional()
}).strict();
export const AgricultureResourceListRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureResourceListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceListRelationFilter>;
export const AgricultureResourceListRelationFilterObjectZodSchema = makeSchema();
