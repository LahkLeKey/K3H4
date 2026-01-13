import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereInputObjectSchema as AssignmentWhereInputObjectSchema } from './AssignmentWhereInput.schema';
import { AssignmentUpdateWithoutPayoutsInputObjectSchema as AssignmentUpdateWithoutPayoutsInputObjectSchema } from './AssignmentUpdateWithoutPayoutsInput.schema';
import { AssignmentUncheckedUpdateWithoutPayoutsInputObjectSchema as AssignmentUncheckedUpdateWithoutPayoutsInputObjectSchema } from './AssignmentUncheckedUpdateWithoutPayoutsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AssignmentUpdateWithoutPayoutsInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutPayoutsInputObjectSchema)])
}).strict();
export const AssignmentUpdateToOneWithWhereWithoutPayoutsInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateToOneWithWhereWithoutPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateToOneWithWhereWithoutPayoutsInput>;
export const AssignmentUpdateToOneWithWhereWithoutPayoutsInputObjectZodSchema = makeSchema();
