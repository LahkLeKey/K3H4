import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutCreateWithoutPersonaInputObjectSchema as AssignmentPayoutCreateWithoutPersonaInputObjectSchema } from './AssignmentPayoutCreateWithoutPersonaInput.schema';
import { AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema as AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema } from './AssignmentPayoutUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AssignmentPayoutCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutCreateOrConnectWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutCreateOrConnectWithoutPersonaInput>;
export const AssignmentPayoutCreateOrConnectWithoutPersonaInputObjectZodSchema = makeSchema();
