import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateWithoutUserInputObjectSchema as AssignmentCreateWithoutUserInputObjectSchema } from './AssignmentCreateWithoutUserInput.schema';
import { AssignmentUncheckedCreateWithoutUserInputObjectSchema as AssignmentUncheckedCreateWithoutUserInputObjectSchema } from './AssignmentUncheckedCreateWithoutUserInput.schema';
import { AssignmentCreateOrConnectWithoutUserInputObjectSchema as AssignmentCreateOrConnectWithoutUserInputObjectSchema } from './AssignmentCreateOrConnectWithoutUserInput.schema';
import { AssignmentCreateManyUserInputEnvelopeObjectSchema as AssignmentCreateManyUserInputEnvelopeObjectSchema } from './AssignmentCreateManyUserInputEnvelope.schema';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentCreateWithoutUserInputObjectSchema), z.lazy(() => AssignmentCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AssignmentUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AssignmentCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AssignmentUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUncheckedCreateNestedManyWithoutUserInput>;
export const AssignmentUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
