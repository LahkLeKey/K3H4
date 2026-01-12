import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutScalarWhereInputObjectSchema as AssignmentPayoutScalarWhereInputObjectSchema } from './AssignmentPayoutScalarWhereInput.schema';
import { AssignmentPayoutUpdateManyMutationInputObjectSchema as AssignmentPayoutUpdateManyMutationInputObjectSchema } from './AssignmentPayoutUpdateManyMutationInput.schema';
import { AssignmentPayoutUncheckedUpdateManyWithoutAssignmentInputObjectSchema as AssignmentPayoutUncheckedUpdateManyWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUncheckedUpdateManyWithoutAssignmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentPayoutUpdateManyMutationInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedUpdateManyWithoutAssignmentInputObjectSchema)])
}).strict();
export const AssignmentPayoutUpdateManyWithWhereWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUpdateManyWithWhereWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUpdateManyWithWhereWithoutAssignmentInput>;
export const AssignmentPayoutUpdateManyWithWhereWithoutAssignmentInputObjectZodSchema = makeSchema();
