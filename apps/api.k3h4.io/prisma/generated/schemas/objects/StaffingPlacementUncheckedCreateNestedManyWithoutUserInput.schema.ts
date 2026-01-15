import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutUserInputObjectSchema as StaffingPlacementCreateWithoutUserInputObjectSchema } from './StaffingPlacementCreateWithoutUserInput.schema';
import { StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema as StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutUserInput.schema';
import { StaffingPlacementCreateOrConnectWithoutUserInputObjectSchema as StaffingPlacementCreateOrConnectWithoutUserInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutUserInput.schema';
import { StaffingPlacementCreateManyUserInputEnvelopeObjectSchema as StaffingPlacementCreateManyUserInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyUserInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUncheckedCreateNestedManyWithoutUserInput>;
export const StaffingPlacementUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
