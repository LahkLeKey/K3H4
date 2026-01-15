import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCreateWithoutRolesInputObjectSchema as StaffingEngagementCreateWithoutRolesInputObjectSchema } from './StaffingEngagementCreateWithoutRolesInput.schema';
import { StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema as StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutRolesInput.schema';
import { StaffingEngagementCreateOrConnectWithoutRolesInputObjectSchema as StaffingEngagementCreateOrConnectWithoutRolesInputObjectSchema } from './StaffingEngagementCreateOrConnectWithoutRolesInput.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutRolesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingEngagementCreateOrConnectWithoutRolesInputObjectSchema).optional(),
  connect: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).optional()
}).strict();
export const StaffingEngagementCreateNestedOneWithoutRolesInputObjectSchema: z.ZodType<Prisma.StaffingEngagementCreateNestedOneWithoutRolesInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementCreateNestedOneWithoutRolesInput>;
export const StaffingEngagementCreateNestedOneWithoutRolesInputObjectZodSchema = makeSchema();
