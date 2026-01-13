import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityScalarWhereInputObjectSchema as PersonaCompatibilityScalarWhereInputObjectSchema } from './PersonaCompatibilityScalarWhereInput.schema';
import { PersonaCompatibilityUpdateManyMutationInputObjectSchema as PersonaCompatibilityUpdateManyMutationInputObjectSchema } from './PersonaCompatibilityUpdateManyMutationInput.schema';
import { PersonaCompatibilityUncheckedUpdateManyWithoutUserInputObjectSchema as PersonaCompatibilityUncheckedUpdateManyWithoutUserInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PersonaCompatibilityUpdateManyMutationInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const PersonaCompatibilityUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateManyWithWhereWithoutUserInput>;
export const PersonaCompatibilityUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
