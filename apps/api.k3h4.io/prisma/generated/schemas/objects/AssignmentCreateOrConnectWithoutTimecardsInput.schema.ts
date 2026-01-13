import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentCreateWithoutTimecardsInputObjectSchema as AssignmentCreateWithoutTimecardsInputObjectSchema } from './AssignmentCreateWithoutTimecardsInput.schema';
import { AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema as AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema } from './AssignmentUncheckedCreateWithoutTimecardsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AssignmentCreateWithoutTimecardsInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema)])
}).strict();
export const AssignmentCreateOrConnectWithoutTimecardsInputObjectSchema: z.ZodType<Prisma.AssignmentCreateOrConnectWithoutTimecardsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateOrConnectWithoutTimecardsInput>;
export const AssignmentCreateOrConnectWithoutTimecardsInputObjectZodSchema = makeSchema();
