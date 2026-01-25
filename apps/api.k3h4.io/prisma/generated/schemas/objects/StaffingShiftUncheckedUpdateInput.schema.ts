import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema as EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema } from './EnumLifecycleStatusFieldUpdateOperationsInput.schema';
import { CoverageStatusSchema } from '../enums/CoverageStatus.schema';
import { EnumCoverageStatusFieldUpdateOperationsInputObjectSchema as EnumCoverageStatusFieldUpdateOperationsInputObjectSchema } from './EnumCoverageStatusFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  roleId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  location: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  startsAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  endsAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([LifecycleStatusSchema, z.lazy(() => EnumLifecycleStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  coverageStatus: z.union([CoverageStatusSchema, z.lazy(() => EnumCoverageStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  assignedPersonaId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  assignedCandidateId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  notes: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const StaffingShiftUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.StaffingShiftUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUncheckedUpdateInput>;
export const StaffingShiftUncheckedUpdateInputObjectZodSchema = makeSchema();
