import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutCreateWithoutPersonaInputObjectSchema as AssignmentPayoutCreateWithoutPersonaInputObjectSchema } from './AssignmentPayoutCreateWithoutPersonaInput.schema';
import { AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema as AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema } from './AssignmentPayoutUncheckedCreateWithoutPersonaInput.schema';
import { AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectSchema as AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectSchema } from './AssignmentPayoutCreateOrConnectWithoutPersonaInput.schema';
import { AssignmentPayoutCreateManyPersonaInputEnvelopeObjectSchema as AssignmentPayoutCreateManyPersonaInputEnvelopeObjectSchema } from './AssignmentPayoutCreateManyPersonaInputEnvelope.schema';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentPayoutCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutCreateWithoutPersonaInputObjectSchema).array(), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentPayoutCreateManyPersonaInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInput>;
export const AssignmentPayoutUncheckedCreateNestedManyWithoutPersonaInputObjectZodSchema = makeSchema();
