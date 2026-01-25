import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { EnumLifecycleStatusWithAggregatesFilterObjectSchema as EnumLifecycleStatusWithAggregatesFilterObjectSchema } from './EnumLifecycleStatusWithAggregatesFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumCoverageStatusWithAggregatesFilterObjectSchema as EnumCoverageStatusWithAggregatesFilterObjectSchema } from './EnumCoverageStatusWithAggregatesFilter.schema';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema'

const staffingshiftscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => StaffingShiftScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StaffingShiftScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => StaffingShiftScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => StaffingShiftScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => StaffingShiftScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  roleId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  location: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  startsAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  endsAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusWithAggregatesFilterObjectSchema), LifecycleStatusSchema]).optional(),
  coverageStatus: z.union([z.lazy(() => EnumCoverageStatusWithAggregatesFilterObjectSchema), CoverageStatusSchema]).optional(),
  assignedPersonaId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  assignedCandidateId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  notes: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const StaffingShiftScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.StaffingShiftScalarWhereWithAggregatesInput> = staffingshiftscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.StaffingShiftScalarWhereWithAggregatesInput>;
export const StaffingShiftScalarWhereWithAggregatesInputObjectZodSchema = staffingshiftscalarwherewithaggregatesinputSchema;
