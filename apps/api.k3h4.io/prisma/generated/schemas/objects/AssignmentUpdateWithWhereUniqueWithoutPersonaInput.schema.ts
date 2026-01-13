import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentUpdateWithoutPersonaInputObjectSchema as AssignmentUpdateWithoutPersonaInputObjectSchema } from './AssignmentUpdateWithoutPersonaInput.schema';
import { AssignmentUncheckedUpdateWithoutPersonaInputObjectSchema as AssignmentUncheckedUpdateWithoutPersonaInputObjectSchema } from './AssignmentUncheckedUpdateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentUpdateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutPersonaInputObjectSchema)])
}).strict();
export const AssignmentUpdateWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentUpdateWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpdateWithWhereUniqueWithoutPersonaInput>;
export const AssignmentUpdateWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
