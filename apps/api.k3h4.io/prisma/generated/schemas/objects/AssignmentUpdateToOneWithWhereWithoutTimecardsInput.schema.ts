import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereInputObjectSchema as AssignmentWhereInputObjectSchema } from './AssignmentWhereInput.schema';
import { AssignmentUpdateWithoutTimecardsInputObjectSchema as AssignmentUpdateWithoutTimecardsInputObjectSchema } from './AssignmentUpdateWithoutTimecardsInput.schema';
import { AssignmentUncheckedUpdateWithoutTimecardsInputObjectSchema as AssignmentUncheckedUpdateWithoutTimecardsInputObjectSchema } from './AssignmentUncheckedUpdateWithoutTimecardsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AssignmentUpdateWithoutTimecardsInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutTimecardsInputObjectSchema)])
}).strict();
export const AssignmentUpdateToOneWithWhereWithoutTimecardsInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateToOneWithWhereWithoutTimecardsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateToOneWithWhereWithoutTimecardsInput>;
export const AssignmentUpdateToOneWithWhereWithoutTimecardsInputObjectZodSchema = makeSchema();
