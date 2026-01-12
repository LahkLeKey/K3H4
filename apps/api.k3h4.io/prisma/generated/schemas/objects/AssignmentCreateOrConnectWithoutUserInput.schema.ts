import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentCreateWithoutUserInputObjectSchema as AssignmentCreateWithoutUserInputObjectSchema } from './AssignmentCreateWithoutUserInput.schema';
import { AssignmentUncheckedCreateWithoutUserInputObjectSchema as AssignmentUncheckedCreateWithoutUserInputObjectSchema } from './AssignmentUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AssignmentCreateWithoutUserInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AssignmentCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AssignmentCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateOrConnectWithoutUserInput>;
export const AssignmentCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
