import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './MaptilerQueryWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => MaptilerQueryWhereInputObjectSchema).optional(),
  some: z.lazy(() => MaptilerQueryWhereInputObjectSchema).optional(),
  none: z.lazy(() => MaptilerQueryWhereInputObjectSchema).optional()
}).strict();
export const MaptilerQueryListRelationFilterObjectSchema: z.ZodType<Prisma.MaptilerQueryListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryListRelationFilter>;
export const MaptilerQueryListRelationFilterObjectZodSchema = makeSchema();
