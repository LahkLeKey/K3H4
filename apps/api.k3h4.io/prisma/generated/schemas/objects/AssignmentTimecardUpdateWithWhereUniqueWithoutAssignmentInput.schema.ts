import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './AssignmentTimecardWhereUniqueInput.schema';
import { AssignmentTimecardUpdateWithoutAssignmentInputObjectSchema as AssignmentTimecardUpdateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUpdateWithoutAssignmentInput.schema';
import { AssignmentTimecardUncheckedUpdateWithoutAssignmentInputObjectSchema as AssignmentTimecardUncheckedUpdateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUncheckedUpdateWithoutAssignmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentTimecardUpdateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardUncheckedUpdateWithoutAssignmentInputObjectSchema)])
}).strict();
export const AssignmentTimecardUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardUpdateWithWhereUniqueWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardUpdateWithWhereUniqueWithoutAssignmentInput>;
export const AssignmentTimecardUpdateWithWhereUniqueWithoutAssignmentInputObjectZodSchema = makeSchema();
