import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementCreateWithoutRolesInputObjectSchema as StaffingEngagementCreateWithoutRolesInputObjectSchema } from './StaffingEngagementCreateWithoutRolesInput.schema';
import { StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema as StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutRolesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutRolesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema)])
}).strict();
export const StaffingEngagementCreateOrConnectWithoutRolesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateOrConnectWithoutRolesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateOrConnectWithoutRolesInput>;
export const StaffingEngagementCreateOrConnectWithoutRolesInputObjectZodSchema = makeSchema();
