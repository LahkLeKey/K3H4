import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardWhereUniqueInputObjectSchema as AssignmentTimecardWhereUniqueInputObjectSchema } from './AssignmentTimecardWhereUniqueInput.schema';
import { AssignmentTimecardCreateWithoutAssignmentInputObjectSchema as AssignmentTimecardCreateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardCreateWithoutAssignmentInput.schema';
import { AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema as AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUncheckedCreateWithoutAssignmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentTimecardWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AssignmentTimecardCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentTimecardUncheckedCreateWithoutAssignmentInputObjectSchema)])
}).strict();
export const AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardCreateOrConnectWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardCreateOrConnectWithoutAssignmentInput>;
export const AssignmentTimecardCreateOrConnectWithoutAssignmentInputObjectZodSchema = makeSchema();
