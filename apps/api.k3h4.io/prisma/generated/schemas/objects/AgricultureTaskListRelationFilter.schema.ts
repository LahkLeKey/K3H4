import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereInputObjectSchema as AgricultureTaskWhereInputObjectSchema } from './AgricultureTaskWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AgricultureTaskWhereInputObjectSchema).optional(),
  some: z.lazy(() => AgricultureTaskWhereInputObjectSchema).optional(),
  none: z.lazy(() => AgricultureTaskWhereInputObjectSchema).optional()
}).strict();
export const AgricultureTaskListRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureTaskListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskListRelationFilter>;
export const AgricultureTaskListRelationFilterObjectZodSchema = makeSchema();
