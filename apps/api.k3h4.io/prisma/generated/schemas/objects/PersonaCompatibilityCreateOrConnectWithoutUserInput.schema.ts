import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereUniqueInputObjectSchema as PersonaCompatibilityWhereUniqueInputObjectSchema } from './PersonaCompatibilityWhereUniqueInput.schema';
import { PersonaCompatibilityCreateWithoutUserInputObjectSchema as PersonaCompatibilityCreateWithoutUserInputObjectSchema } from './PersonaCompatibilityCreateWithoutUserInput.schema';
import { PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema as PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema } from './PersonaCompatibilityUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaCompatibilityWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaCompatibilityCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaCompatibilityUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PersonaCompatibilityCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateOrConnectWithoutUserInput>;
export const PersonaCompatibilityCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
