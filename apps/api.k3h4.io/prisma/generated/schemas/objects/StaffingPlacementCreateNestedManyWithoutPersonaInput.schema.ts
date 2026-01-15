import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutPersonaInputObjectSchema as StaffingPlacementCreateWithoutPersonaInputObjectSchema } from './StaffingPlacementCreateWithoutPersonaInput.schema';
import { StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema as StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutPersonaInput.schema';
import { StaffingPlacementCreateOrConnectWithoutPersonaInputObjectSchema as StaffingPlacementCreateOrConnectWithoutPersonaInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutPersonaInput.schema';
import { StaffingPlacementCreateManyPersonaInputEnvelopeObjectSchema as StaffingPlacementCreateManyPersonaInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyPersonaInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementCreateNestedManyWithoutPersonaInputObjectSchema: z.ZodType<Prisma.StaffingPlacementCreateNestedManyWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementCreateNestedManyWithoutPersonaInput>;
export const StaffingPlacementCreateNestedManyWithoutPersonaInputObjectZodSchema = makeSchema();
