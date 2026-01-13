import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateWithoutTimecardsInputObjectSchema as AssignmentCreateWithoutTimecardsInputObjectSchema } from './AssignmentCreateWithoutTimecardsInput.schema';
import { AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema as AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema } from './AssignmentUncheckedCreateWithoutTimecardsInput.schema';
import { AssignmentCreateOrConnectWithoutTimecardsInputObjectSchema as AssignmentCreateOrConnectWithoutTimecardsInputObjectSchema } from './AssignmentCreateOrConnectWithoutTimecardsInput.schema';
import { AssignmentUpsertWithoutTimecardsInputObjectSchema as AssignmentUpsertWithoutTimecardsInputObjectSchema } from './AssignmentUpsertWithoutTimecardsInput.schema';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentUpdateToOneWithWhereWithoutTimecardsInputObjectSchema as AssignmentUpdateToOneWithWhereWithoutTimecardsInputObjectSchema } from './AssignmentUpdateToOneWithWhereWithoutTimecardsInput.schema';
import { AssignmentUpdateWithoutTimecardsInputObjectSchema as AssignmentUpdateWithoutTimecardsInputObjectSchema } from './AssignmentUpdateWithoutTimecardsInput.schema';
import { AssignmentUncheckedUpdateWithoutTimecardsInputObjectSchema as AssignmentUncheckedUpdateWithoutTimecardsInputObjectSchema } from './AssignmentUncheckedUpdateWithoutTimecardsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AssignmentCreateWithoutTimecardsInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutTimecardsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => AssignmentCreateOrConnectWithoutTimecardsInputObjectSchema).optional(),
  upsert: z.lazy(() => AssignmentUpsertWithoutTimecardsInputObjectSchema).optional(),
  connect: z.lazy(() => AssignmentWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => AssignmentUpdateToOneWithWhereWithoutTimecardsInputObjectSchema), z.lazy(() => AssignmentUpdateWithoutTimecardsInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutTimecardsInputObjectSchema)]).optional()
}).strict();
export const AssignmentUpdateOneRequiredWithoutTimecardsNestedInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateOneRequiredWithoutTimecardsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateOneRequiredWithoutTimecardsNestedInput>;
export const AssignmentUpdateOneRequiredWithoutTimecardsNestedInputObjectZodSchema = makeSchema();
