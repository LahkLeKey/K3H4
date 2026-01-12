import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutScalarWhereInputObjectSchema as AssignmentPayoutScalarWhereInputObjectSchema } from './AssignmentPayoutScalarWhereInput.schema';
import { AssignmentPayoutUpdateManyMutationInputObjectSchema as AssignmentPayoutUpdateManyMutationInputObjectSchema } from './AssignmentPayoutUpdateManyMutationInput.schema';
import { AssignmentPayoutUncheckedUpdateManyWithoutPersonaInputObjectSchema as AssignmentPayoutUncheckedUpdateManyWithoutPersonaInputObjectSchema } from './AssignmentPayoutUncheckedUpdateManyWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentPayoutScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentPayoutUpdateManyMutationInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedUpdateManyWithoutPersonaInputObjectSchema)])
}).strict();
export const AssignmentPayoutUpdateManyWithWhereWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUpdateManyWithWhereWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUpdateManyWithWhereWithoutPersonaInput>;
export const AssignmentPayoutUpdateManyWithWhereWithoutPersonaInputObjectZodSchema = makeSchema();
