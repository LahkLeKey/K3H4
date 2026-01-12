import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentCreateWithoutPayoutsInputObjectSchema as AssignmentCreateWithoutPayoutsInputObjectSchema } from './AssignmentCreateWithoutPayoutsInput.schema';
import { AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema as AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema } from './AssignmentUncheckedCreateWithoutPayoutsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AssignmentCreateWithoutPayoutsInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema)])
}).strict();
export const AssignmentCreateOrConnectWithoutPayoutsInputObjectSchema: z.ZodType<Prisma.AssignmentCreateOrConnectWithoutPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateOrConnectWithoutPayoutsInput>;
export const AssignmentCreateOrConnectWithoutPayoutsInputObjectZodSchema = makeSchema();
