import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaCreateWithoutAssignmentPayoutsInputObjectSchema as PersonaCreateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaCreateWithoutAssignmentPayoutsInput.schema';
import { PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema as PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUncheckedCreateWithoutAssignmentPayoutsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCreateWithoutAssignmentPayoutsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema)])
}).strict();
export const PersonaCreateOrConnectWithoutAssignmentPayoutsInputObjectSchema: z.ZodType<Prisma.PersonaCreateOrConnectWithoutAssignmentPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateOrConnectWithoutAssignmentPayoutsInput>;
export const PersonaCreateOrConnectWithoutAssignmentPayoutsInputObjectZodSchema = makeSchema();
