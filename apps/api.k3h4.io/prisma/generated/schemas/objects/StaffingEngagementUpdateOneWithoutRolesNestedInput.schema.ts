import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCreateWithoutRolesInputObjectSchema as StaffingEngagementCreateWithoutRolesInputObjectSchema } from './StaffingEngagementCreateWithoutRolesInput.schema';
import { StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema as StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutRolesInput.schema';
import { StaffingEngagementCreateOrConnectWithoutRolesInputObjectSchema as StaffingEngagementCreateOrConnectWithoutRolesInputObjectSchema } from './StaffingEngagementCreateOrConnectWithoutRolesInput.schema';
import { StaffingEngagementUpsertWithoutRolesInputObjectSchema as StaffingEngagementUpsertWithoutRolesInputObjectSchema } from './StaffingEngagementUpsertWithoutRolesInput.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementUpdateToOneWithWhereWithoutRolesInputObjectSchema as StaffingEngagementUpdateToOneWithWhereWithoutRolesInputObjectSchema } from './StaffingEngagementUpdateToOneWithWhereWithoutRolesInput.schema';
import { StaffingEngagementUpdateWithoutRolesInputObjectSchema as StaffingEngagementUpdateWithoutRolesInputObjectSchema } from './StaffingEngagementUpdateWithoutRolesInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutRolesInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutRolesInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutRolesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutRolesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutRolesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingEngagementCreateOrConnectWithoutRolesInputObjectSchema).optional(),
  upsert: z.lazy(() => StaffingEngagementUpsertWithoutRolesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StaffingEngagementWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StaffingEngagementWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StaffingEngagementUpdateToOneWithWhereWithoutRolesInputObjectSchema), z.lazy(() => StaffingEngagementUpdateWithoutRolesInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutRolesInputObjectSchema)]).optional()
}).strict();
export const StaffingEngagementUpdateOneWithoutRolesNestedInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpdateOneWithoutRolesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateOneWithoutRolesNestedInput>;
export const StaffingEngagementUpdateOneWithoutRolesNestedInputObjectZodSchema = makeSchema();
