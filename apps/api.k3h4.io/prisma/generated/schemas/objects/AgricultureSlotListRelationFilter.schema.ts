import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotWhereInputObjectSchema as AgricultureSlotWhereInputObjectSchema } from './AgricultureSlotWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AgricultureSlotWhereInputObjectSchema).optional(),
  some: z.lazy(() => AgricultureSlotWhereInputObjectSchema).optional(),
  none: z.lazy(() => AgricultureSlotWhereInputObjectSchema).optional()
}).strict();
export const AgricultureSlotListRelationFilterObjectSchema: z.ZodType<Prisma.AgricultureSlotListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotListRelationFilter>;
export const AgricultureSlotListRelationFilterObjectZodSchema = makeSchema();
