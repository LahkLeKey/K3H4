import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutRoleInputObjectSchema as StaffingPlacementCreateWithoutRoleInputObjectSchema } from './StaffingPlacementCreateWithoutRoleInput.schema';
import { StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema as StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutRoleInput.schema';
import { StaffingPlacementCreateOrConnectWithoutRoleInputObjectSchema as StaffingPlacementCreateOrConnectWithoutRoleInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutRoleInput.schema';
import { StaffingPlacementCreateManyRoleInputEnvelopeObjectSchema as StaffingPlacementCreateManyRoleInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyRoleInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutRoleInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutRoleInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutRoleInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutRoleInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyRoleInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementUncheckedCreateNestedManyWithoutRoleInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUncheckedCreateNestedManyWithoutRoleInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUncheckedCreateNestedManyWithoutRoleInput>;
export const StaffingPlacementUncheckedCreateNestedManyWithoutRoleInputObjectZodSchema = makeSchema();
