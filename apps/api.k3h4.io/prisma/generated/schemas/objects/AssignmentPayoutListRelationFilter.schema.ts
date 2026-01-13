import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutWhereInputObjectSchema as AssignmentPayoutWhereInputObjectSchema } from './AssignmentPayoutWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => AssignmentPayoutWhereInputObjectSchema).optional(),
  some: z.lazy(() => AssignmentPayoutWhereInputObjectSchema).optional(),
  none: z.lazy(() => AssignmentPayoutWhereInputObjectSchema).optional()
}).strict();
export const AssignmentPayoutListRelationFilterObjectSchema: z.ZodType<Prisma.AssignmentPayoutListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutListRelationFilter>;
export const AssignmentPayoutListRelationFilterObjectZodSchema = makeSchema();
