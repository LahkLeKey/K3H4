import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutWhereUniqueInputObjectSchema as AssignmentPayoutWhereUniqueInputObjectSchema } from './AssignmentPayoutWhereUniqueInput.schema';
import { AssignmentPayoutUpdateWithoutPersonaInputObjectSchema as AssignmentPayoutUpdateWithoutPersonaInputObjectSchema } from './AssignmentPayoutUpdateWithoutPersonaInput.schema';
import { AssignmentPayoutUncheckedUpdateWithoutPersonaInputObjectSchema as AssignmentPayoutUncheckedUpdateWithoutPersonaInputObjectSchema } from './AssignmentPayoutUncheckedUpdateWithoutPersonaInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AssignmentPayoutWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AssignmentPayoutUpdateWithoutPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutUncheckedUpdateWithoutPersonaInputObjectSchema)])
}).strict();
export const AssignmentPayoutUpdateWithWhereUniqueWithoutPersonaInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutUpdateWithWhereUniqueWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutUpdateWithWhereUniqueWithoutPersonaInput>;
export const AssignmentPayoutUpdateWithWhereUniqueWithoutPersonaInputObjectZodSchema = makeSchema();
