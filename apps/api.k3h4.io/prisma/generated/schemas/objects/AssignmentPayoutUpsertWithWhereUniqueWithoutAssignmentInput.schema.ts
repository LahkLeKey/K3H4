import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutUpdateWithoutAssignmentInputObjectSchema as AssignmentPayoutUpdateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUpdateWithoutAssignmentInput.schema';
import { AssignmentPayoutUncheckedUpdateWithoutAssignmentInputObjectSchema as AssignmentPayoutUncheckedUpdateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUncheckedUpdateWithoutAssignmentInput.schema';
import { AssignmentPayoutCreateWithoutAssignmentInputObjectSchema as AssignmentPayoutCreateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutCreateWithoutAssignmentInput.schema';
import { AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema as AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUncheckedCreateWithoutAssignmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AssignmentPayoutUpdateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedUpdateWithoutAssignmentInputObjectSchema)]),
  create: z.union([z.lazy(() => AssignmentPayoutCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema)])
}).strict();
export const AssignmentPayoutUpsertWithWhereUniqueWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUpsertWithWhereUniqueWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUpsertWithWhereUniqueWithoutAssignmentInput>;
export const AssignmentPayoutUpsertWithWhereUniqueWithoutAssignmentInputObjectZodSchema = makeSchema();
