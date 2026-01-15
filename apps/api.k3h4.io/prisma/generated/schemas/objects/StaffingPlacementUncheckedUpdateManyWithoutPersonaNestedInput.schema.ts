import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingPlacementCreateWithoutPersonaInputObjectSchema as StaffingPlacementCreateWithoutPersonaInputObjectSchema } from './StaffingPlacementCreateWithoutPersonaInput.schema';
import { StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema as StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema } from './StaffingPlacementUncheckedCreateWithoutPersonaInput.schema';
import { StaffingPlacementCreateOrConnectWithoutPersonaInputObjectSchema as StaffingPlacementCreateOrConnectWithoutPersonaInputObjectSchema } from './StaffingPlacementCreateOrConnectWithoutPersonaInput.schema';
import { StaffingPlacementUpsertWithWhereUniqueWithoutPersonaInputObjectSchema as StaffingPlacementUpsertWithWhereUniqueWithoutPersonaInputObjectSchema } from './StaffingPlacementUpsertWithWhereUniqueWithoutPersonaInput.schema';
import { StaffingPlacementCreateManyPersonaInputEnvelopeObjectSchema as StaffingPlacementCreateManyPersonaInputEnvelopeObjectSchema } from './StaffingPlacementCreateManyPersonaInputEnvelope.schema';
import { StaffingPlacementWhereUniqueInputObjectSchema as StaffingPlacementWhereUniqueInputObjectSchema } from './StaffingPlacementWhereUniqueInput.schema';
import { StaffingPlacementUpdateWithWhereUniqueWithoutPersonaInputObjectSchema as StaffingPlacementUpdateWithWhereUniqueWithoutPersonaInputObjectSchema } from './StaffingPlacementUpdateWithWhereUniqueWithoutPersonaInput.schema';
import { StaffingPlacementUpdateManyWithWhereWithoutPersonaInputObjectSchema as StaffingPlacementUpdateManyWithWhereWithoutPersonaInputObjectSchema } from './StaffingPlacementUpdateManyWithWhereWithoutPersonaInput.schema';
import { StaffingPlacementScalarWhereInputObjectSchema as StaffingPlacementScalarWhereInputObjectSchema } from './StaffingPlacementScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingPlacementCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingPlacementCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementUpsertWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingPlacementCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema), z.lazy(() => StaffingPlacementWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementUpdateWithWhereUniqueWithoutPersonaInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutPersonaInputObjectSchema), z.lazy(() => StaffingPlacementUpdateManyWithWhereWithoutPersonaInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema), z.lazy(() => StaffingPlacementScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingPlacementUncheckedUpdateManyWithoutPersonaNestedInputObjectSchema: z.ZodType<Prisma.StaffingPlacementUncheckedUpdateManyWithoutPersonaNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementUncheckedUpdateManyWithoutPersonaNestedInput>;
export const StaffingPlacementUncheckedUpdateManyWithoutPersonaNestedInputObjectZodSchema = makeSchema();
