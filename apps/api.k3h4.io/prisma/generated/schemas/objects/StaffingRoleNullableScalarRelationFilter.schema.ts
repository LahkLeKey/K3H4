import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional().nullable(),
  isNot: z.lazy(() => StaffingRoleWhereInputObjectSchema).optional().nullable()
}).strict();
export const StaffingRoleNullableScalarRelationFilterObjectSchema: z.ZodType<Prisma.StaffingRoleNullableScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleNullableScalarRelationFilter>;
export const StaffingRoleNullableScalarRelationFilterObjectZodSchema = makeSchema();
