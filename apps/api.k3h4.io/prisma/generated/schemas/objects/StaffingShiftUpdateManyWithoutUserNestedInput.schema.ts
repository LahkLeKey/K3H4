import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateWithoutUserInputObjectSchema as StaffingShiftCreateWithoutUserInputObjectSchema } from './StaffingShiftCreateWithoutUserInput.schema';
import { StaffingShiftUncheckedCreateWithoutUserInputObjectSchema as StaffingShiftUncheckedCreateWithoutUserInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutUserInput.schema';
import { StaffingShiftCreateOrConnectWithoutUserInputObjectSchema as StaffingShiftCreateOrConnectWithoutUserInputObjectSchema } from './StaffingShiftCreateOrConnectWithoutUserInput.schema';
import { StaffingShiftUpsertWithWhereUniqueWithoutUserInputObjectSchema as StaffingShiftUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingShiftUpsertWithWhereUniqueWithoutUserInput.schema';
import { StaffingShiftCreateManyUserInputEnvelopeObjectSchema as StaffingShiftCreateManyUserInputEnvelopeObjectSchema } from './StaffingShiftCreateManyUserInputEnvelope.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftUpdateWithWhereUniqueWithoutUserInputObjectSchema as StaffingShiftUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './StaffingShiftUpdateWithWhereUniqueWithoutUserInput.schema';
import { StaffingShiftUpdateManyWithWhereWithoutUserInputObjectSchema as StaffingShiftUpdateManyWithWhereWithoutUserInputObjectSchema } from './StaffingShiftUpdateManyWithWhereWithoutUserInput.schema';
import { StaffingShiftScalarWhereInputObjectSchema as StaffingShiftScalarWhereInputObjectSchema } from './StaffingShiftScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingShiftUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingShiftCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => StaffingShiftUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingShiftCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => StaffingShiftUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => StaffingShiftUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => StaffingShiftScalarWhereInputObjectSchema), z.lazy(() => StaffingShiftScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const StaffingShiftUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.StaffingShiftUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUpdateManyWithoutUserNestedInput>;
export const StaffingShiftUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
