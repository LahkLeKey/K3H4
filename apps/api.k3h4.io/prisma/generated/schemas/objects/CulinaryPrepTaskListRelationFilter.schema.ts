import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryPrepTaskWhereInputObjectSchema as CulinaryPrepTaskWhereInputObjectSchema } from './CulinaryPrepTaskWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CulinaryPrepTaskWhereInputObjectSchema).optional(),
  some: z.lazy(() => CulinaryPrepTaskWhereInputObjectSchema).optional(),
  none: z.lazy(() => CulinaryPrepTaskWhereInputObjectSchema).optional()
}).strict();
export const CulinaryPrepTaskListRelationFilterObjectSchema: z.ZodType<Prisma.CulinaryPrepTaskListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryPrepTaskListRelationFilter>;
export const CulinaryPrepTaskListRelationFilterObjectZodSchema = makeSchema();
