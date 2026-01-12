import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateWithoutPayoutsInputObjectSchema as AssignmentCreateWithoutPayoutsInputObjectSchema } from './AssignmentCreateWithoutPayoutsInput.schema';
import { AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema as AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema } from './AssignmentUncheckedCreateWithoutPayoutsInput.schema';
import { AssignmentCreateOrConnectWithoutPayoutsInputObjectSchema as AssignmentCreateOrConnectWithoutPayoutsInputObjectSchema } from './AssignmentCreateOrConnectWithoutPayoutsInput.schema';
import { AssignmentUpsertWithoutPayoutsInputObjectSchema as AssignmentUpsertWithoutPayoutsInputObjectSchema } from './AssignmentUpsertWithoutPayoutsInput.schema';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentUpdateToOneWithWhereWithoutPayoutsInputObjectSchema as AssignmentUpdateToOneWithWhereWithoutPayoutsInputObjectSchema } from './AssignmentUpdateToOneWithWhereWithoutPayoutsInput.schema';
import { AssignmentUpdateWithoutPayoutsInputObjectSchema as AssignmentUpdateWithoutPayoutsInputObjectSchema } from './AssignmentUpdateWithoutPayoutsInput.schema';
import { AssignmentUncheckedUpdateWithoutPayoutsInputObjectSchema as AssignmentUncheckedUpdateWithoutPayoutsInputObjectSchema } from './AssignmentUncheckedUpdateWithoutPayoutsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentCreateWithoutPayoutsInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutPayoutsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AssignmentCreateOrConnectWithoutPayoutsInputObjectSchema).optional(),
  upsert: z.lazy(() => AssignmentUpsertWithoutPayoutsInputObjectSchema).optional(),
  connect: z.lazy(() => AssignmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AssignmentUpdateToOneWithWhereWithoutPayoutsInputObjectSchema), z.lazy(() => AssignmentUpdateWithoutPayoutsInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutPayoutsInputObjectSchema)]).optional()
}).strict();
export const AssignmentUpdateOneRequiredWithoutPayoutsNestedInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateOneRequiredWithoutPayoutsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateOneRequiredWithoutPayoutsNestedInput>;
export const AssignmentUpdateOneRequiredWithoutPayoutsNestedInputObjectZodSchema = makeSchema();
