import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingRoleCreateWithoutPlacementsInputObjectSchema as StaffingRoleCreateWithoutPlacementsInputObjectSchema } from './StaffingRoleCreateWithoutPlacementsInput.schema';
import { StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema as StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema } from './StaffingRoleUncheckedCreateWithoutPlacementsInput.schema';
import { StaffingRoleCreateOrConnectWithoutPlacementsInputObjectSchema as StaffingRoleCreateOrConnectWithoutPlacementsInputObjectSchema } from './StaffingRoleCreateOrConnectWithoutPlacementsInput.schema';
import { StaffingRoleUpsertWithoutPlacementsInputObjectSchema as StaffingRoleUpsertWithoutPlacementsInputObjectSchema } from './StaffingRoleUpsertWithoutPlacementsInput.schema';
import { StaffingRoleWhereInputObjectSchema as StaffingRoleWhereInputObjectSchema } from './StaffingRoleWhereInput.schema';
import { StaffingRoleWhereUniqueInputObjectSchema as StaffingRoleWhereUniqueInputObjectSchema } from './StaffingRoleWhereUniqueInput.schema';
import { StaffingRoleUpdateToOneWithWhereWithoutPlacementsInputObjectSchema as StaffingRoleUpdateToOneWithWhereWithoutPlacementsInputObjectSchema } from './StaffingRoleUpdateToOneWithWhereWithoutPlacementsInput.schema';
import { StaffingRoleUpdateWithoutPlacementsInputObjectSchema as StaffingRoleUpdateWithoutPlacementsInputObjectSchema } from './StaffingRoleUpdateWithoutPlacementsInput.schema';
import { StaffingRoleUncheckedUpdateWithoutPlacementsInputObjectSchema as StaffingRoleUncheckedUpdateWithoutPlacementsInputObjectSchema } from './StaffingRoleUncheckedUpdateWithoutPlacementsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingRoleCreateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedCreateWithoutPlacementsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => StaffingRoleCreateOrConnectWithoutPlacementsInputObjectSchema).optional(),
  upsert: z.lazy(() => StaffingRoleUpsertWithoutPlacementsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => StaffingRoleWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => StaffingRoleWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => StaffingRoleWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => StaffingRoleUpdateToOneWithWhereWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingRoleUpdateWithoutPlacementsInputObjectSchema), z.lazy(() => StaffingRoleUncheckedUpdateWithoutPlacementsInputObjectSchema)]).optional()
}).strict();
export const StaffingRoleUpdateOneWithoutPlacementsNestedInputObjectSchema: z.ZodType<Prisma.StaffingRoleUpdateOneWithoutPlacementsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleUpdateOneWithoutPlacementsNestedInput>;
export const StaffingRoleUpdateOneWithoutPlacementsNestedInputObjectZodSchema = makeSchema();
