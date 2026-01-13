import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateWithoutPayoutsInputObjectSchema as AssignmentCreateWithoutPayoutsInputObjectSchema } from './AssignmentCreateWithoutPayoutsInput.schema';
import { AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema as AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema } from './AssignmentUncheckedCreateWithoutPayoutsInput.schema';
import { AssignmentCreateOrConnectWithoutPayoutsInputObjectSchema as AssignmentCreateOrConnectWithoutPayoutsInputObjectSchema } from './AssignmentCreateOrConnectWithoutPayoutsInput.schema';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentCreateWithoutPayoutsInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AssignmentCreateOrConnectWithoutPayoutsInputObjectSchema).optional(),
  connect: z.lazy(() => AssignmentWhereUniqueInputObjectSchema).optional()
}).strict();
export const AssignmentCreateNestedOneWithoutPayoutsInputObjectSchema: z.ZodType<Prisma.AssignmentCreateNestedOneWithoutPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateNestedOneWithoutPayoutsInput>;
export const AssignmentCreateNestedOneWithoutPayoutsInputObjectZodSchema = makeSchema();
