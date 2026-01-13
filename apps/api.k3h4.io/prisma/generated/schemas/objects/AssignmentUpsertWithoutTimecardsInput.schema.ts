import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentUpdateWithoutTimecardsInputObjectSchema as AssignmentUpdateWithoutTimecardsInputObjectSchema } from './AssignmentUpdateWithoutTimecardsInput.schema';
import { AssignmentUncheckedUpdateWithoutTimecardsInputObjectSchema as AssignmentUncheckedUpdateWithoutTimecardsInputObjectSchema } from './AssignmentUncheckedUpdateWithoutTimecardsInput.schema';
import { AssignmentCreateWithoutTimecardsInputObjectSchema as AssignmentCreateWithoutTimecardsInputObjectSchema } from './AssignmentCreateWithoutTimecardsInput.schema';
import { AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema as AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema } from './AssignmentUncheckedCreateWithoutTimecardsInput.schema';
import { AssignmentWhereInputObjectSchema as AssignmentWhereInputObjectSchema } from './AssignmentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AssignmentUpdateWithoutTimecardsInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutTimecardsInputObjectSchema)]),
  create: z.union([z.lazy(() => AssignmentCreateWithoutTimecardsInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema)]),
  where: z.lazy(() => AssignmentWhereInputObjectSchema).optional()
}).strict();
export const AssignmentUpsertWithoutTimecardsInputObjectSchema: z.ZodType<Prisma.AssignmentUpsertWithoutTimecardsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpsertWithoutTimecardsInput>;
export const AssignmentUpsertWithoutTimecardsInputObjectZodSchema = makeSchema();
