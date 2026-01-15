import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftCreateWithoutUserInputObjectSchema as StaffingShiftCreateWithoutUserInputObjectSchema } from './StaffingShiftCreateWithoutUserInput.schema';
import { StaffingShiftUncheckedCreateWithoutUserInputObjectSchema as StaffingShiftUncheckedCreateWithoutUserInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutUserInput.schema';
import { StaffingShiftCreateOrConnectWithoutUserInputObjectSchema as StaffingShiftCreateOrConnectWithoutUserInputObjectSchema } from './StaffingShiftCreateOrConnectWithoutUserInput.schema';
import { StaffingShiftCreateManyUserInputEnvelopeObjectSchema as StaffingShiftCreateManyUserInputEnvelopeObjectSchema } from './StaffingShiftCreateManyUserInputEnvelope.schema';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftCreateWithoutUserInputObjectSchema).array(), z.lazy(() => StaffingShiftUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => StaffingShiftCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => StaffingShiftCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema), z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const StaffingShiftUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingShiftUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftUncheckedCreateNestedManyWithoutUserInput>;
export const StaffingShiftUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
