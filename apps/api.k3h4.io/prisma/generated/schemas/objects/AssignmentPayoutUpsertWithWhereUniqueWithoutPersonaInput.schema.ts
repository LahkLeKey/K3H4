import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutUpdateWithoutPersonaInputObjectSchema as AssignmentPayoutUpdateWithoutPersonaInputObjectSchema } from './AssignmentPayoutUpdateWithoutPersonaInput.schema';
import { AssignmentPayoutUncheckedUpdateWithoutPersonaInputObjectSchema as AssignmentPayoutUncheckedUpdateWithoutPersonaInputObjectSchema } from './AssignmentPayoutUncheckedUpdateWithoutPersonaInput.schema';
import { AssignmentPayoutCreateWithoutPersonaInputObjectSchema as AssignmentPayoutCreateWithoutPersonaInputObjectSchema } from './AssignmentPayoutCreateWithoutPersonaInput.schema';
import { AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema as AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema } from './AssignmentPayoutUncheckedCreateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AssignmentPayoutUpdateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedUpdateWithoutPersonaInputObjectSchema)]),
  create: z.union([z.lazy(() => AssignmentPayoutCreateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedCreateWithoutPersonaInputObjectSchema)])
}).strict();
export const AssignmentPayoutUpsertWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUpsertWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUpsertWithWhereUniqueWithoutPersonaInput>;
export const AssignmentPayoutUpsertWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
