import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema';
import { PersonaUpdateWithoutAssignmentPayoutsInputObjectSchema as PersonaUpdateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUpdateWithoutAssignmentPayoutsInput.schema';
import { PersonaUncheckedUpdateWithoutAssignmentPayoutsInputObjectSchema as PersonaUncheckedUpdateWithoutAssignmentPayoutsInputObjectSchema } from './PersonaUncheckedUpdateWithoutAssignmentPayoutsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => PersonaUpdateWithoutAssignmentPayoutsInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateWithoutAssignmentPayoutsInputObjectSchema)])
}).strict();
export const PersonaUpdateToOneWithWhereWithoutAssignmentPayoutsInputObjectSchema: z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutAssignmentPayoutsInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateToOneWithWhereWithoutAssignmentPayoutsInput>;
export const PersonaUpdateToOneWithWhereWithoutAssignmentPayoutsInputObjectZodSchema = makeSchema();
