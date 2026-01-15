import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementUpdateWithoutRolesInputObjectSchema as StaffingEngagementUpdateWithoutRolesInputObjectSchema } from './StaffingEngagementUpdateWithoutRolesInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutRolesInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutRolesInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutRolesInput.schema';
import { StaffingEngagementCreateWithoutRolesInputObjectSchema as StaffingEngagementCreateWithoutRolesInputObjectSchema } from './StaffingEngagementCreateWithoutRolesInput.schema';
import { StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema as StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutRolesInput.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => StaffingEngagementUpdateWithoutRolesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutRolesInputObjectSchema)]),
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutRolesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema)]),
  where: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional()
}).strict();
export const StaffingEngagementUpsertWithoutRolesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpsertWithoutRolesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpsertWithoutRolesInput>;
export const StaffingEngagementUpsertWithoutRolesInputObjectZodSchema = makeSchema();
