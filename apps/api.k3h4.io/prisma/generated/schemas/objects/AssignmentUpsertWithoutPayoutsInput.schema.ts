import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentUpdateWithoutPayoutsInputObjectSchema as AssignmentUpdateWithoutPayoutsInputObjectSchema } from './AssignmentUpdateWithoutPayoutsInput.schema';
import { AssignmentUncheckedUpdateWithoutPayoutsInputObjectSchema as AssignmentUncheckedUpdateWithoutPayoutsInputObjectSchema } from './AssignmentUncheckedUpdateWithoutPayoutsInput.schema';
import { AssignmentCreateWithoutPayoutsInputObjectSchema as AssignmentCreateWithoutPayoutsInputObjectSchema } from './AssignmentCreateWithoutPayoutsInput.schema';
import { AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema as AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema } from './AssignmentUncheckedCreateWithoutPayoutsInput.schema';
import { AssignmentWhereInputObjectSchema as AssignmentWhereInputObjectSchema } from './AssignmentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AssignmentUpdateWithoutPayoutsInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutPayoutsInputObjectSchema)]),
  create: z.union([z.lazy(() => AssignmentCreateWithoutPayoutsInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema)]),
  where: z.lazy(() => AssignmentWhereInputObjectSchema).optional()
}).strict();
export const AssignmentUpsertWithoutPayoutsInputObjectSchema: z.ZodType<Prisma.AssignmentUpsertWithoutPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpsertWithoutPayoutsInput>;
export const AssignmentUpsertWithoutPayoutsInputObjectZodSchema = makeSchema();
