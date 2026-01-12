import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaScalarWhereInputObjectSchema as PersonaScalarWhereInputObjectSchema } from './PersonaScalarWhereInput.schema';
import { PersonaUpdateManyMutationInputObjectSchema as PersonaUpdateManyMutationInputObjectSchema } from './PersonaUpdateManyMutationInput.schema';
import { PersonaUncheckedUpdateManyWithoutUserInputObjectSchema as PersonaUncheckedUpdateManyWithoutUserInputObjectSchema } from './PersonaUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => PersonaUpdateManyMutationInputObjectSchema), z.lazy(() => PersonaUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const PersonaUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaUpdateManyWithWhereWithoutUserInput>;
export const PersonaUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
