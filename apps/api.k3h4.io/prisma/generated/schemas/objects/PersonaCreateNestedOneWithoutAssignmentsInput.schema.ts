import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateWithoutAssignmentsInputObjectSchema as PersonaCreateWithoutAssignmentsInputObjectSchema } from './PersonaCreateWithoutAssignmentsInput.schema';
import { PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema as PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema } from './PersonaUncheckedCreateWithoutAssignmentsInput.schema';
import { PersonaCreateOrConnectWithoutAssignmentsInputObjectSchema as PersonaCreateOrConnectWithoutAssignmentsInputObjectSchema } from './PersonaCreateOrConnectWithoutAssignmentsInput.schema';
import { PersonaWhereUniqueInputObjectSchema as PersonaWhereUniqueInputObjectSchema } from './PersonaWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => PersonaCreateWithoutAssignmentsInputObjectSchema), z.lazy(() => PersonaUncheckedCreateWithoutAssignmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => PersonaCreateOrConnectWithoutAssignmentsInputObjectSchema).optional(),
  connect: z.lazy(() => PersonaWhereUniqueInputObjectSchema).optional()
}).strict();
export const PersonaCreateNestedOneWithoutAssignmentsInputObjectSchema: z.ZodType<Prisma.PersonaCreateNestedOneWithoutAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateNestedOneWithoutAssignmentsInput>;
export const PersonaCreateNestedOneWithoutAssignmentsInputObjectZodSchema = makeSchema();
