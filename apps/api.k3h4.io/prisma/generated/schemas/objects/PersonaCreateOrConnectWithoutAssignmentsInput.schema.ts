import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema';
import { PersonaCreateWithoutAssignmentsInputObjectSchema as PersonaCreateWithoutAssignmentsInputObjectSchema } from './PersonaCreateWithoutAssignmentsInput.schema';
import { PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema as PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema } from './PersonaUncheckedCreateWithoutAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCreateWithoutAssignmentsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema)])
}).strict();
export const PersonaCreateOrConnectWithoutAssignmentsInputObjectSchema: z.ZodType<Prisma.PersonaCreateOrConnectWithoutAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateOrConnectWithoutAssignmentsInput>;
export const PersonaCreateOrConnectWithoutAssignmentsInputObjectZodSchema = makeSchema();
