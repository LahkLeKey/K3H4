import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AiInsightWhereInputObjectSchema as AiInsightWhereInputObjectSchema } from './AiInsightWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AiInsightWhereInputObjectSchema).optional(),
  some: z.lazy(() => AiInsightWhereInputObjectSchema).optional(),
  none: z.lazy(() => AiInsightWhereInputObjectSchema).optional()
}).strict();
export const AiInsightListRelationFilterObjectSchema: z.ZodType<Prisma.AiInsightListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightListRelationFilter>;
export const AiInsightListRelationFilterObjectZodSchema = makeSchema();
