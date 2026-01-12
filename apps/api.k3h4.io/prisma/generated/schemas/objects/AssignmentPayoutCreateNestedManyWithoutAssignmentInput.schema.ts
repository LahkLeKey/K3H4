import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutCreateWithoutAssignmentInputObjectSchema as AssignmentPayoutCreateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutCreateWithoutAssignmentInput.schema';
import { AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema as AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema } from './AssignmentPayoutUncheckedCreateWithoutAssignmentInput.schema';
import { AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectSchema as AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectSchema } from './AssignmentPayoutCreateOrConnectWithoutAssignmentInput.schema';
import { AssignmentPayoutCreateManyAssignmentInputEnvelopeObjectSchema as AssignmentPayoutCreateManyAssignmentInputEnvelopeObjectSchema } from './AssignmentPayoutCreateManyAssignmentInputEnvelope.schema';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentPayoutCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutCreateWithoutAssignmentInputObjectSchema).array(), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutAssignmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectSchema), z.lazy(() => AssignmentPayoutCreateOrConnectWithoutAssignmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AssignmentPayoutCreateManyAssignmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema), z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AssignmentPayoutCreateNestedManyWithoutAssignmentInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutCreateNestedManyWithoutAssignmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutCreateNestedManyWithoutAssignmentInput>;
export const AssignmentPayoutCreateNestedManyWithoutAssignmentInputObjectZodSchema = makeSchema();
