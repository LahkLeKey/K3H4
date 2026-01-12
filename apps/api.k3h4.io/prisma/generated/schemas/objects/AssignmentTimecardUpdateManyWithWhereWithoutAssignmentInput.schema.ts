import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentTimecardScalarWhereInputObjectSchema as AssignmentTimecardScalarWhereInputObjectSchema } from './AssignmentTimecardScalarWhereInput.schema';
import { AssignmentTimecardUpdateManyMutationInputObjectSchema as AssignmentTimecardUpdateManyMutationInputObjectSchema } from './AssignmentTimecardUpdateManyMutationInput.schema';
import { AssignmentTimecardUncheckedUpdateManyWithoutAssignmentInputObjectSchema as AssignmentTimecardUncheckedUpdateManyWithoutAssignmentInputObjectSchema } from './AssignmentTimecardUncheckedUpdateManyWithoutAssignmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentTimecardScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentTimecardUpdateManyMutationInputObjectSchema), z.lazy(() => AssignmentTimecardUncheckedUpdateManyWithoutAssignmentInputObjectSchema)])
}).strict();
export const AssignmentTimecardUpdateManyWithWhereWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardUpdateManyWithWhereWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardUpdateManyWithWhereWithoutAssignmentInput>;
export const AssignmentTimecardUpdateManyWithWhereWithoutAssignmentInputObjectZodSchema = makeSchema();
