import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentUpdateWithoutUserInputObjectSchema as AssignmentUpdateWithoutUserInputObjectSchema } from './AssignmentUpdateWithoutUserInput.schema';
import { AssignmentUncheckedUpdateWithoutUserInputObjectSchema as AssignmentUncheckedUpdateWithoutUserInputObjectSchema } from './AssignmentUncheckedUpdateWithoutUserInput.schema';
import { AssignmentCreateWithoutUserInputObjectSchema as AssignmentCreateWithoutUserInputObjectSchema } from './AssignmentCreateWithoutUserInput.schema';
import { AssignmentUncheckedCreateWithoutUserInputObjectSchema as AssignmentUncheckedCreateWithoutUserInputObjectSchema } from './AssignmentUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AssignmentUpdateWithoutUserInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => AssignmentCreateWithoutUserInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AssignmentUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AssignmentUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpsertWithWhereUniqueWithoutUserInput>;
export const AssignmentUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
