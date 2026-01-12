import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeWhereUniqueInputObjectSchema as PersonaAttributeWhereUniqueInputObjectSchema } from './PersonaAttributeWhereUniqueInput.schema';
import { PersonaAttributeCreateWithoutUserInputObjectSchema as PersonaAttributeCreateWithoutUserInputObjectSchema } from './PersonaAttributeCreateWithoutUserInput.schema';
import { PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema as PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema } from './PersonaAttributeUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PersonaAttributeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => PersonaAttributeCreateWithoutUserInputObjectSchema), z.lazy(() => PersonaAttributeUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const PersonaAttributeCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaAttributeCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCreateOrConnectWithoutUserInput>;
export const PersonaAttributeCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
