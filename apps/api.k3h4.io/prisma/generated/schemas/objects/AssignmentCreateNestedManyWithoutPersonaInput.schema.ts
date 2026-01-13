import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateWithoutPersonaInputObjectSchema as AssignmentCreateWithoutPersonaInputObjectSchema } from './AssignmentCreateWithoutPersonaInput.schema';
import { AssignmentUncheckedCreateWithoutPersonaInputObjectSchema as AssignmentUncheckedCreateWithoutPersonaInputObjectSchema } from './AssignmentUncheckedCreateWithoutPersonaInput.schema';
import { AssignmentCreateOrConnectWithoutPersonaInputObjectSchema as AssignmentCreateOrConnectWithoutPersonaInputObjectSchema } from './AssignmentCreateOrConnectWithoutPersonaInput.schema';
import { AssignmentCreateManyPersonaInputEnvelopeObjectSchema as AssignmentCreateManyPersonaInputEnvelopeObjectSchema } from './AssignmentCreateManyPersonaInputEnvelope.schema';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => AssignmentUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AssignmentWhereUniqueInputObjectSchema), z.lazy(() => AssignmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentCreateNestedManyWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentCreateNestedManyWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateNestedManyWithoutPersonaInput>;
export const AssignmentCreateNestedManyWithoutPersonaInputObjectZodSchema = makeSchema();
