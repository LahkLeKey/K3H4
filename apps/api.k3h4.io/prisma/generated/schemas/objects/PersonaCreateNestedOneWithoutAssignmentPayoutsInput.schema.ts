import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutAssignmentPayoutsInputObjectSchema as PersonaCreateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaCreateWithoutAssignmentPayoutsInput.schema';
import { PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema as PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUncheckedCreateWithoutAssignmentPayoutsInput.schema';
import { PersonaCreateOrConnectWithoutAssignmentPayoutsInputObjectSchema as PersonaCreateOrConnectWithoutAssignmentPayoutsInputObjectSchema } from './PersonaCreateOrConnectWithoutAssignmentPayoutsInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutAssignmentPayoutsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAssignmentPayoutsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutAssignmentPayoutsInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional()
}).strict();
export const PersonaCreateNestedOneWithoutAssignmentPayoutsInputObjectSchema: z.ZodType<Prisma.PersonaCreateNestedOneWithoutAssignmentPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateNestedOneWithoutAssignmentPayoutsInput>;
export const PersonaCreateNestedOneWithoutAssignmentPayoutsInputObjectZodSchema = makeSchema();
