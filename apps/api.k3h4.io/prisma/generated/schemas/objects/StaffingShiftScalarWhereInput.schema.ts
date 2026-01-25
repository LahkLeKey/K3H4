import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumCoverageStatusFilterObjectSchema as EnumCoverageStatusFilterObjectSchema } from './EnumCoverageStatusFilter.schema';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema'

const staffingshiftscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffingShiftScalarWhereInputObjectSchema), z.lazy(() => StaffingShiftScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffingShiftScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffingShiftScalarWhereInputObjectSchema), z.lazy(() => StaffingShiftScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  roleId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  location: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  startsAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  endsAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  coverageStatus: z.union([z.lazy(() => EnumCoverageStatusFilterObjectSchema), CoverageStatusSchema]).optional(),
  assignedPersonaId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  assignedCandidateId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const StaffingShiftScalarWhereInputObjectSchema: z.ZodType<Prisma.StaffingShiftScalarWhereInput> = staffingshiftscalarwhereinputSchema as unknown as z.ZodType<Prisma.StaffingShiftScalarWhereInput>;
export const StaffingShiftScalarWhereInputObjectZodSchema = staffingshiftscalarwhereinputSchema;
