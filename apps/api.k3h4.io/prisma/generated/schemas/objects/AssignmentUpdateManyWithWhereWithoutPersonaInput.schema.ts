import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentScalarWhereInputObjectSchema as AssignmentScalarWhereInputObjectSchema } from './AssignmentScalarWhereInput.schema';
import { AssignmentUpdateManyMutationInputObjectSchema as AssignmentUpdateManyMutationInputObjectSchema } from './AssignmentUpdateManyMutationInput.schema';
import { AssignmentUncheckedUpdateManyWithoutPersonaInputObjectSchema as AssignmentUncheckedUpdateManyWithoutPersonaInputObjectSchema } from './AssignmentUncheckedUpdateManyWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentUpdateManyMutationInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateManyWithoutPersonaInputObjectSchema)])
}).strict();
export const AssignmentUpdateManyWithWhereWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateManyWithWhereWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateManyWithWhereWithoutPersonaInput>;
export const AssignmentUpdateManyWithWhereWithoutPersonaInputObjectZodSchema = makeSchema();
