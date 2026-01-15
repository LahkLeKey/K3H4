import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional(),
  some: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional(),
  none: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional()
}).strict();
export const StaffingRoleListRelationFilterObjectSchema: z.ZodType<Prisma.StaffingRoleListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleListRelationFilter>;
export const StaffingRoleListRelationFilterObjectZodSchema = makeSchema();
