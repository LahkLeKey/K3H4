import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutUpdateWithoutAssignmentInputObjectSchema as AssignmentPayoutUpdateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUpdateWithoutAssignmentInput.schema';
import { AssignmentPayoutUncheckedUpdateWithoutAssignmentInputObjectSchema as AssignmentPayoutUncheckedUpdateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUncheckedUpdateWithoutAssignmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentPayoutUpdateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedUpdateWithoutAssignmentInputObjectSchema)])
}).strict();
export const AssignmentPayoutUpdateWithWhereUniqueWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUpdateWithWhereUniqueWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUpdateWithWhereUniqueWithoutAssignmentInput>;
export const AssignmentPayoutUpdateWithWhereUniqueWithoutAssignmentInputObjectZodSchema = makeSchema();
