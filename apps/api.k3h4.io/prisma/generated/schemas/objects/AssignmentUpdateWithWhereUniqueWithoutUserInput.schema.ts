import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentUpdateWithoutUserInputObjectSchema as AssignmentUpdateWithoutUserInputObjectSchema } from './AssignmentUpdateWithoutUserInput.schema';
import { AssignmentUncheckedUpdateWithoutUserInputObjectSchema as AssignmentUncheckedUpdateWithoutUserInputObjectSchema } from './AssignmentUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentUpdateWithoutUserInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const AssignmentUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateWithWhereUniqueWithoutUserInput>;
export const AssignmentUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
