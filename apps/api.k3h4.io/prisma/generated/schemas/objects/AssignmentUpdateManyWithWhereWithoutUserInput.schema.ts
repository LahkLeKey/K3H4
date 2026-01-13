import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentScalarWhereInputObjectSchema as AssignmentScalarWhereInputObjectSchema } from './AssignmentScalarWhereInput.schema';
import { AssignmentUpdateManyMutationInputObjectSchema as AssignmentUpdateManyMutationInputObjectSchema } from './AssignmentUpdateManyMutationInput.schema';
import { AssignmentUncheckedUpdateManyWithoutUserInputObjectSchema as AssignmentUncheckedUpdateManyWithoutUserInputObjectSchema } from './AssignmentUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentUpdateManyMutationInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const AssignmentUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateManyWithWhereWithoutUserInput>;
export const AssignmentUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
