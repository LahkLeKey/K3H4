import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StaffingShiftWhereUniqueInputObjectSchema as StaffingShiftWhereUniqueInputObjectSchema } from './StaffingShiftWhereUniqueInput.schema';
import { StaffingShiftCreateWithoutUserInputObjectSchema as StaffingShiftCreateWithoutUserInputObjectSchema } from './StaffingShiftCreateWithoutUserInput.schema';
import { StaffingShiftUncheckedCreateWithoutUserInputObjectSchema as StaffingShiftUncheckedCreateWithoutUserInputObjectSchema } from './StaffingShiftUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => StaffingShiftWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => StaffingShiftCreateWithoutUserInputObjectSchema), z.lazy(() => StaffingShiftUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const StaffingShiftCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.StaffingShiftCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftCreateOrConnectWithoutUserInput>;
export const StaffingShiftCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
