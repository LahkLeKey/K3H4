import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateWithoutTimecardsInputObjectSchema as AssignmentCreateWithoutTimecardsInputObjectSchema } from './AssignmentCreateWithoutTimecardsInput.schema';
import { AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema as AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema } from './AssignmentUncheckedCreateWithoutTimecardsInput.schema';
import { AssignmentCreateOrConnectWithoutTimecardsInputObjectSchema as AssignmentCreateOrConnectWithoutTimecardsInputObjectSchema } from './AssignmentCreateOrConnectWithoutTimecardsInput.schema';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentCreateWithoutTimecardsInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AssignmentCreateOrConnectWithoutTimecardsInputObjectSchema).optional(),
  connect: z.lazy(() => AssignmentWhereUniqueInputObjectSchema).optional()
}).strict();
export const AssignmentCreateNestedOneWithoutTimecardsInputObjectSchema: z.ZodType<Prisma.AssignmentCreateNestedOneWithoutTimecardsInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateNestedOneWithoutTimecardsInput>;
export const AssignmentCreateNestedOneWithoutTimecardsInputObjectZodSchema = makeSchema();
