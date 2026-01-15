import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingEngagementCreateWithoutPlacementsInputObjectSchema as StaffingEngagementCreateWithoutPlacementsInputObjectSchema } from './StaffingEngagementCreateWithoutPlacementsInput.schema';
import { StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUncheckedCreateWithoutPlacementsInput.schema';
import { StaffingEngagementCreateOrConnectWithoutPlacementsInputObjectSchema as StaffingEngagementCreateOrConnectWithoutPlacementsInputObjectSchema } from './StaffingEngagementCreateOrConnectWithoutPlacementsInput.schema';
import { StaffingEngagementUpsertWithoutPlacementsInputObjectSchema as StaffingEngagementUpsertWithoutPlacementsInputObjectSchema } from './StaffingEngagementUpsertWithoutPlacementsInput.schema';
import { StaffingEngagementWhereInputObjectSchema as StaffingEngagementWhereInputObjectSchema } from './StaffingEngagementWhereInput.schema';
import { StaffingEngagementWhereUniqueInputObjectSchema as StaffingEngagementWhereUniqueInputObjectSchema } from './StaffingEngagementWhereUniqueInput.schema';
import { StaffingEngagementUpdateToOneWithWhereWithoutPlacementsInputObjectSchema as StaffingEngagementUpdateToOneWithWhereWithoutPlacementsInputObjectSchema } from './StaffingEngagementUpdateToOneWithWhereWithoutPlacementsInput.schema';
import { StaffingEngagementUpdateWithoutPlacementsInputObjectSchema as StaffingEngagementUpdateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUpdateWithoutPlacementsInput.schema';
import { StaffingEngagementUncheckedUpdateWithoutPlacementsInputObjectSchema as StaffingEngagementUncheckedUpdateWithoutPlacementsInputObjectSchema } from './StaffingEngagementUncheckedUpdateWithoutPlacementsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingEngagementCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedCreateWithoutPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingEngagementCreateOrConnectWithoutPlacementsInputObjectSchema).optional(),
  upsert: z.lazy(() => StaffingEngagementUpsertWithoutPlacementsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StaffingEngagementWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StaffingEngagementWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StaffingEngagementWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StaffingEngagementUpdateToOneWithWhereWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingEngagementUpdateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingEngagementUncheckedUpdateWithoutPlacementsInputObjectSchema)]).optional()
}).strict();
export const StaffingEngagementUpdateOneWithoutPlacementsNestedInputObjectSchema: z.ZodType<Prisma.StaffingEngagementUpdateOneWithoutPlacementsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementUpdateOneWithoutPlacementsNestedInput>;
export const StaffingEngagementUpdateOneWithoutPlacementsNestedInputObjectZodSchema = makeSchema();
