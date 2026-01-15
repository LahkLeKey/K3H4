import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema as StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftCreateWithoutAssignedPersonaInput.schema';
import { StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema as StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutAssignedPersonaInput.schema';
import { StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectSchema as StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftCreateOrConnectWithoutAssignedPersonaInput.schema';
import { StaffingShiftUpsertWithWhereUniqueWithoutAssignedPersonaInputObjectSchema as StaffingShiftUpsertWithWhereUniqueWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUpsertWithWhereUniqueWithoutAssignedPersonaInput.schema';
import { StaffingShiftCreateManyAssignedPersonaInputEnvelopeObjectSchema as StaffingShiftCreateManyAssignedPersonaInputEnvelopeObjectSchema } from './StaffingShiftCreateManyAssignedPersonaInputEnvelope.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithWhereUniqueWithoutAssignedPersonaInputObjectSchema as StaffingShiftUpdateWithWhereUniqueWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUpdateWithWhereUniqueWithoutAssignedPersonaInput.schema';
import { StaffingShiftUpdateManyWithWhereWithoutAssignedPersonaInputObjectSchema as StaffingShiftUpdateManyWithWhereWithoutAssignedPersonaInputObjectSchema } from './StaffingShiftUpdateManyWithWhereWithoutAssignedPersonaInput.schema';
import { StaffingShiftScalarWhereInputObjectSchema as StaffingShiftScalarWhereInputObjectSchema } from './StaffingShiftScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftCreateWithoutAssignedPersonaInputObjectSchema).array(), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutAssignedPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftCreateOrConnectWithoutAssignedPersonaInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingShiftUpsertWithWhereUniqueWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftUpsertWithWhereUniqueWithoutAssignedPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingShiftCreateManyAssignedPersonaInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingShiftUpdateWithWhereUniqueWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftUpdateWithWhereUniqueWithoutAssignedPersonaInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingShiftUpdateManyWithWhereWithoutAssignedPersonaInputObjectSchema), z.lazy(() => StaffingShiftUpdateManyWithWhereWithoutAssignedPersonaInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingShiftScalarWhereInputObjectSchema), z.lazy(() => StaffingShiftScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaNestedInputObjectSchema: z.ZodType<Prisma.StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaNestedInput>;
export const StaffingShiftUncheckedUpdateManyWithoutAssignedPersonaNestedInputObjectZodSchema = makeSchema();
