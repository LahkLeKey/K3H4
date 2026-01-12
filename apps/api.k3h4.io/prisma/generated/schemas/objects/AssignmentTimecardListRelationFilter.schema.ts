import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardWhereInputObjectSchema as AssignmentTimecardWhereInputObjectSchema } from './AssignmentTimecardWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AssignmentTimecardWhereInputObjectSchema).optional(),
  some: z.lazy(() => AssignmentTimecardWhereInputObjectSchema).optional(),
  none: z.lazy(() => AssignmentTimecardWhereInputObjectSchema).optional()
}).strict();
export const AssignmentTimecardListRelationFilterObjectSchema: z.ZodType<Prisma.AssignmentTimecardListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardListRelationFilter>;
export const AssignmentTimecardListRelationFilterObjectZodSchema = makeSchema();
