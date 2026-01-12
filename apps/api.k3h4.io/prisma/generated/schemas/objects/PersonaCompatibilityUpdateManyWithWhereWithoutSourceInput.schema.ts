import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityScalarWhereInputObjectSchema as PersonaCompatibilityScalarWhereInputObjectSchema } from './PersonaCompatibilityScalarWhereInput.schema';
import { PersonaCompatibilityUpdateManyMutationInputObjectSchema as PersonaCompatibilityUpdateManyMutationInputObjectSchema } from './PersonaCompatibilityUpdateManyMutationInput.schema';
import { PersonaCompatibilityUncheckedUpdateManyWithoutSourceInputObjectSchema as PersonaCompatibilityUncheckedUpdateManyWithoutSourceInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateManyWithoutSourceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PersonaCompatibilityUpdateManyMutationInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedUpdateManyWithoutSourceInputObjectSchema)])
}).strict();
export const PersonaCompatibilityUpdateManyWithWhereWithoutSourceInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpdateManyWithWhereWithoutSourceInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateManyWithWhereWithoutSourceInput>;
export const PersonaCompatibilityUpdateManyWithWhereWithoutSourceInputObjectZodSchema = makeSchema();
