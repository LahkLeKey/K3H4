import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './AssignmentTimecardWhereUniqueInput.schema';
import { AssignmentTimecardUpdateWithoutAssignmentInputObjectSchema as AssignmentTimecardUpdateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUpdateWithoutAssignmentInput.schema';
import { AssignmentTimecardUncheckedUpdateWithoutAssignmentInputObjectSchema as AssignmentTimecardUncheckedUpdateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUncheckedUpdateWithoutAssignmentInput.schema';
import { AssignmentTimecardCreateWithoutAssignmentInputObjectSchema as AssignmentTimecardCreateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardCreateWithoutAssignmentInput.schema';
import { AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema as AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUncheckedCreateWithoutAssignmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AssignmentTimecardUpdateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardUncheckedUpdateWithoutAssignmentInputObjectSchema)]),
  create: z.union([z.lazy(() => AssignmentTimecardCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema)])
}).strict();
export const AssignmentTimecardUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardUpsertWithWhereUniqueWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardUpsertWithWhereUniqueWithoutAssignmentInput>;
export const AssignmentTimecardUpsertWithWhereUniqueWithoutAssignmentInputObjectZodSchema = makeSchema();
