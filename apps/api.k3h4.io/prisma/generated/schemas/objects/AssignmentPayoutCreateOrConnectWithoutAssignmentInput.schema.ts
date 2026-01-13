import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutCreateWithoutAssignmentInputObjectSchema as AssignmentPayoutCreateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutCreateWithoutAssignmentInput.schema';
import { AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema as AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUncheckedCreateWithoutAssignmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AssignmentPayoutCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema)])
}).strict();
export const AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutCreateOrConnectWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutCreateOrConnectWithoutAssignmentInput>;
export const AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectZodSchema = makeSchema();
