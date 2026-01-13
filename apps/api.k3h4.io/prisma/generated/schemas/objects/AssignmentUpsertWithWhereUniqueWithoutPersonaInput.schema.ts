import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentWhereUniqueInputObjectSchema as AssignmentWhereUniqueInputObjectSchema } from './AssignmentWhereUniqueInput.schema';
import { AssignmentUpdateWithoutPersonaInputObjectSchema as AssignmentUpdateWithoutPersonaInputObjectSchema } from './AssignmentUpdateWithoutPersonaInput.schema';
import { AssignmentUncheckedUpdateWithoutPersonaInputObjectSchema as AssignmentUncheckedUpdateWithoutPersonaInputObjectSchema } from './AssignmentUncheckedUpdateWithoutPersonaInput.schema';
import { AssignmentCreateWithoutPersonaInputObjectSchema as AssignmentCreateWithoutPersonaInputObjectSchema } from './AssignmentCreateWithoutPersonaInput.schema';
import { AssignmentUncheckedCreateWithoutPersonaInputObjectSchema as AssignmentUncheckedCreateWithoutPersonaInputObjectSchema } from './AssignmentUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AssignmentUpdateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentUncheckedUpdateWithoutPersonaInputObjectSchema)]),
  create: z.union([z.lazy(() => AssignmentCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const AssignmentUpsertWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentUpsertWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentUpsertWithWhereUniqueWithoutPersonaInput>;
export const AssignmentUpsertWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
