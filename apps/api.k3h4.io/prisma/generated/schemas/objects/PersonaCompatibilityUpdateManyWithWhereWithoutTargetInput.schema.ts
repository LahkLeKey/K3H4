import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityScalarWhereInputObjectSchema as PersonaCompatibilityScalarWhereInputObjectSchema } from './PersonaCompatibilityScalarWhereInput.schema';
import { PersonaCompatibilityUpdateManyMutationInputObjectSchema as PersonaCompatibilityUpdateManyMutationInputObjectSchema } from './PersonaCompatibilityUpdateManyMutationInput.schema';
import { PersonaCompatibilityUncheckedUpdateManyWithoutTargetInputObjectSchema as PersonaCompatibilityUncheckedUpdateManyWithoutTargetInputObjectSchema } from './PersonaCompatibilityUncheckedUpdateManyWithoutTargetInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PersonaCompatibilityUpdateManyMutationInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedUpdateManyWithoutTargetInputObjectSchema)])
}).strict();
export const PersonaCompatibilityUpdateManyWithWhereWithoutTargetInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpdateManyWithWhereWithoutTargetInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateManyWithWhereWithoutTargetInput>;
export const PersonaCompatibilityUpdateManyWithWhereWithoutTargetInputObjectZodSchema = makeSchema();
