import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentCreateWithoutPersonaInputObjectSchema as AssignmentCreateWithoutPersonaInputObjectSchema } from './AssignmentCreateWithoutPersonaInput.schema';
import { AssignmentUncheckedCreateWithoutPersonaInputObjectSchema as AssignmentUncheckedCreateWithoutPersonaInputObjectSchema } from './AssignmentUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AssignmentCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const AssignmentCreateOrConnectWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentCreateOrConnectWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateOrConnectWithoutPersonaInput>;
export const AssignmentCreateOrConnectWithoutPersonaInputObjectZodSchema = makeSchema();
