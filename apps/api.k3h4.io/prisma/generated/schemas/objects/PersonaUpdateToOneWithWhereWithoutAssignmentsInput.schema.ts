import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaUpdateWithoutAssignmentsInputObjectSchema as PersonaUpdateWithoutAssignmentsInputObjectSchema } from './PersonaUpdateWithoutAssignmentsInput.schema';
import { PersonaUncheckedUpdateWithoutAssignmentsInputObjectSchema as PersonaUncheckedUpdateWithoutAssignmentsInputObjectSchema } from './PersonaUncheckedUpdateWithoutAssignmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PersonaUpdateWithoutAssignmentsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutAssignmentsInputObjectSchema)])
}).strict();
export const PersonaUpdateToOneWithWhereWithoutAssignmentsInputObjectSchema: z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutAssignmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutAssignmentsInput>;
export const PersonaUpdateToOneWithWhereWithoutAssignmentsInputObjectZodSchema = makeSchema();
