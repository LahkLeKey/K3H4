import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => FreightLoadWhereInputObjectSchema).optional(),
  some: z.lazy(() => FreightLoadWhereInputObjectSchema).optional(),
  none: z.lazy(() => FreightLoadWhereInputObjectSchema).optional()
}).strict();
export const FreightLoadListRelationFilterObjectSchema: z.ZodType<Prisma.FreightLoadListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadListRelationFilter>;
export const FreightLoadListRelationFilterObjectZodSchema = makeSchema();
