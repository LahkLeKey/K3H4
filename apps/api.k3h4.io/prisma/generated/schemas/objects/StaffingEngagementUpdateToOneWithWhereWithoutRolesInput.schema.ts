import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema';
import { StaffingEngagementUpdateWithoutRolesInputObjectSchema as StaffingEngagementUpdateWithoutRolesInputObjectSchema } from './StaffingEngagementUpdateWithoutRolesInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutRolesInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutRolesInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutRolesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => StaffingEngagementUpdateWithoutRolesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutRolesInputObjectSchema)])
}).strict();
export const StaffingEngagementUpdateToOneWithWhereWithoutRolesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpdateToOneWithWhereWithoutRolesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateToOneWithWhereWithoutRolesInput>;
export const StaffingEngagementUpdateToOneWithWhereWithoutRolesInputObjectZodSchema = makeSchema();
